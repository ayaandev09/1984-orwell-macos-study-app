import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3084;
const OUT_DIR = path.join(__dirname, "out");
const SYNC_FILE = path.join(__dirname, "sync-store.json");

// In-memory sync state initialized from disk or default
let latestState = {
  version: 1,
  timestamp: Date.now(),
  clientId: "server",
  payload: {
    activeChapterId: "p1-c1",
    viewMode: "focus",
    studyGoal: "revise",
    academicStyle: "newsreader",
    speedReadMode: false,
    completedChapters: {},
    completedSubSections: {},
    bookmarkedQuotes: {},
    chapterNotes: {},
    flashcardMastery: {},
    quizAnswers: {},
  },
};

if (fs.existsSync(SYNC_FILE)) {
  try {
    const raw = fs.readFileSync(SYNC_FILE, "utf-8");
    latestState = JSON.parse(raw);
    console.log(`[Sync] Loaded existing state from disk (timestamp: ${latestState.timestamp})`);
  } catch (err) {
    console.error("[Sync] Error loading sync-store.json:", err);
  }
}

// Active SSE client connections
const sseClients = new Set();

function broadcastSync(data, senderRes = null) {
  const message = `data: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    if (client !== senderRes) {
      try {
        client.write(message);
      } catch (err) {
        sseClients.delete(client);
      }
    }
  }
}

// Heartbeat for SSE clients to prevent timeout
setInterval(() => {
  for (const client of sseClients) {
    try {
      client.write(": keepalive\n\n");
    } catch {
      sseClients.delete(client);
    }
  }
}, 15000);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer((req, res) => {
  // Common CORS and security headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname;

  // ==================== API: LIVE SYNC ENDPOINTS ====================
  if (pathname === "/api/sync" || pathname === "/api/sync/") {
    if (req.method === "GET") {
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      });
      res.end(JSON.stringify({ success: true, ...latestState }));
      return;
    }

    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
        if (body.length > 2 * 1024 * 1024) {
          req.destroy(); // 2MB safety limit
        }
      });

      req.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          const incomingTimestamp = parsed.timestamp || Date.now();

          // Merge if newer or merge keys
          if (incomingTimestamp >= (latestState.timestamp || 0)) {
            latestState = {
              version: 1,
              timestamp: incomingTimestamp,
              clientId: parsed.clientId || "unknown",
              payload: {
                ...latestState.payload,
                ...parsed.payload,
                completedChapters: {
                  ...(latestState.payload?.completedChapters || {}),
                  ...(parsed.payload?.completedChapters || {}),
                },
                completedSubSections: {
                  ...(latestState.payload?.completedSubSections || {}),
                  ...(parsed.payload?.completedSubSections || {}),
                },
                bookmarkedQuotes: {
                  ...(latestState.payload?.bookmarkedQuotes || {}),
                  ...(parsed.payload?.bookmarkedQuotes || {}),
                },
                chapterNotes: {
                  ...(latestState.payload?.chapterNotes || {}),
                  ...(parsed.payload?.chapterNotes || {}),
                },
                flashcardMastery: {
                  ...(latestState.payload?.flashcardMastery || {}),
                  ...(parsed.payload?.flashcardMastery || {}),
                },
                quizAnswers: {
                  ...(latestState.payload?.quizAnswers || {}),
                  ...(parsed.payload?.quizAnswers || {}),
                },
              },
            };

            // Save to disk asynchronously
            fs.writeFile(SYNC_FILE, JSON.stringify(latestState, null, 2), () => {});

            // Broadcast to other clients (Mac <-> iPhone)
            broadcastSync({ type: "SYNC_UPDATE", ...latestState });
          }

          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-cache",
          });
          res.end(JSON.stringify({ success: true, ...latestState }));
        } catch (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "Invalid JSON" }));
        }
      });
      return;
    }
  }

  // ==================== API: SERVER-SENT EVENTS (SSE) ====================
  if (pathname === "/api/sync/events" || pathname === "/api/sync/events/") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    });
    res.write(`data: ${JSON.stringify({ type: "INITIAL_SYNC", ...latestState })}\n\n`);

    sseClients.add(res);

    req.on("close", () => {
      sseClients.delete(res);
    });
    return;
  }

  // ==================== STATIC FILE SERVING ====================
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, "");
  let filePath = path.join(OUT_DIR, safePath);

  // If path is a directory or root, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  // If file doesn't exist, try appending .html
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + ".html")) {
    filePath = filePath + ".html";
  }

  // If still doesn't exist, SPA fallback to out/index.html
  if (!fs.existsSync(filePath)) {
    filePath = path.join(OUT_DIR, "index.html");
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Server Error");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
    });
    res.end(content);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[1984 Server] Running on http://0.0.0.0:${PORT} with Live Cross-Device Sync API`);
});
