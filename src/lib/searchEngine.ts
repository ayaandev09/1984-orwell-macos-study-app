import { ALL_CHAPTERS, BOOK_PARTS, ChapterData } from "@/data";

export interface SearchResultItem {
  id: string;
  displayCode: string;
  partTitle: string;
  title: string;
  subtitle: string;
  matchCategory: "Code" | "Quote" | "Theme" | "Newspeak" | "General";
  matchedQuote?: string;
  matchedSpeaker?: string;
  snippet: string;
  score: number;
}

export type SearchFilterTab = "all" | "chapters" | "quotes" | "themes" | "newspeak";

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/['".,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * High-Precision Multi-Field Search Engine for George Orwell's 1984
 */
export function searchOrwellCodex(
  query: string,
  filterTab: SearchFilterTab = "all"
): SearchResultItem[] {
  const rawQ = query.trim();
  if (!rawQ) return [];

  const q = normalizeText(rawQ);
  const tokens = q.split(" ").filter((t) => t.length > 0);

  // Pattern detection: Part & Chapter notation (e.g. "1.1", "ii.4", "part 2 chapter 3")
  const partChapterMatch = rawQ.match(/(?:part\s*)?([1-3]|i|ii|iii)(?:[\s.:,chapter]+)([1-9]|10)/i);
  let targetPart: number | null = null;
  let targetChapter: number | null = null;

  if (partChapterMatch) {
    const pStr = partChapterMatch[1].toLowerCase();
    const romanMap: Record<string, number> = { i: 1, ii: 2, iii: 3 };
    targetPart = romanMap[pStr] || parseInt(pStr, 10);
    targetChapter = parseInt(partChapterMatch[2], 10);
  }

  const results: SearchResultItem[] = [];

  for (const chapter of ALL_CHAPTERS) {
    let score = 0;
    let matchCategory: SearchResultItem["matchCategory"] = "General";
    let matchedQuote: string | undefined;
    let matchedSpeaker: string | undefined;
    let snippet = chapter.summary || "";

    const bookPart = BOOK_PARTS.find((p) => p.id === chapter.partId);
    const partTitle = bookPart ? `Part ${bookPart.romanNumeral}` : `Part ${chapter.partNumber}`;

    // 1. Direct Pattern Match (Part + Chapter)
    if (targetPart !== null && targetChapter !== null) {
      if (chapter.partNumber === targetPart && chapter.chapterNumber === targetChapter) {
        score += 1500;
        matchCategory = "Code";
      }
    }

    // 2. Display Code Match (e.g. "I.1", "II.4")
    const normCode = normalizeText(chapter.displayCode);
    if (normCode === q || chapter.displayCode.toLowerCase() === rawQ.toLowerCase()) {
      score += 1200;
      matchCategory = "Code";
    } else if (normCode.includes(q)) {
      score += 700;
      matchCategory = "Code";
    }

    // 3. Title & Subtitle Matching
    const normTitle = normalizeText(chapter.title);
    const normSub = normalizeText(chapter.subtitle || "");

    if (normTitle.includes(q)) {
      score += 600;
      if (matchCategory === "General") matchCategory = "Code";
    }
    if (normSub.includes(q)) {
      score += 350;
    }

    // 4. Quotes Matching
    if (chapter.quotes && chapter.quotes.length > 0) {
      for (const qt of chapter.quotes) {
        const normQuote = normalizeText(qt.quote);
        const normSpk = normalizeText(qt.speaker);
        if (normQuote.includes(q)) {
          score += 500;
          matchCategory = "Quote";
          matchedQuote = qt.quote;
          matchedSpeaker = qt.speaker;
          snippet = `"${qt.quote}" — ${qt.speaker}`;
          break;
        } else if (normSpk.includes(q)) {
          score += 250;
          matchCategory = "Quote";
          matchedSpeaker = qt.speaker;
          snippet = `"${qt.quote}" — ${qt.speaker}`;
          break;
        }
      }
    }

    // 5. Newspeak & Terminology Matching
    const newspeakTerms = ["newspeak", "doublethink", "thoughtcrime", "facecrime", "telescreen", "minitrue", "miniluv", "miniplenty", "minipax", "proles", "big brother", "goldstein", "brotherhood", "room 101", "unperson", "vaporized", "duckspeak", "crimestop", "blackwhite", "goodsex", "oldspeak", "airstrip one"];
    for (const term of newspeakTerms) {
      if (q.includes(term) || term.includes(q)) {
        const fullText = `${normTitle} ${normSub} ${normalizeText(chapter.summary || "")}`;
        if (fullText.includes(term)) {
          score += 300;
          if (matchCategory === "General") matchCategory = "Newspeak";
          break;
        }
      }
    }

    // Multi-token fallback scoring
    if (score === 0 && tokens.length > 1) {
      let matchedTokens = 0;
      const haystack = `${normCode} ${normTitle} ${normSub} ${normalizeText(chapter.summary || "")}`;
      for (const t of tokens) {
        if (haystack.includes(t)) matchedTokens++;
      }
      if (matchedTokens === tokens.length) {
        score += 200;
      } else if (matchedTokens > 0) {
        score += matchedTokens * 40;
      }
    }

    // Filter Tab Validation
    if (score > 0) {
      let keep = true;
      if (filterTab === "chapters") {
        keep = true;
      } else if (filterTab === "quotes") {
        keep = matchCategory === "Quote" || Boolean(chapter.quotes && chapter.quotes.length > 0);
      } else if (filterTab === "newspeak") {
        keep = matchCategory === "Newspeak";
      } else if (filterTab === "themes") {
        keep = Boolean(chapter.themeTracking && chapter.themeTracking.length > 0);
      }

      if (keep) {
        results.push({
          id: chapter.id,
          displayCode: chapter.displayCode,
          partTitle,
          title: chapter.title,
          subtitle: chapter.subtitle || "",
          matchCategory,
          matchedQuote,
          matchedSpeaker,
          snippet,
          score,
        });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
