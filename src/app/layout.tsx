import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#060402",
};

export const metadata: Metadata = {
  title: "MINITRUE // 1984 — Liquid Glass Study Database (Mac & Mobile)",
  description:
    "High-performance academic study database and speed-reading dashboard for George Orwell's 1984. Optimized with Apple liquid glass interface, Uniswap fluid jelly animations, and scholarly academic typography.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "1984 Study",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="dark" data-academic-font="jakarta" data-handwritten-style="newsreader">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("study-app-theme")==="light"){document.documentElement.classList.add("theme-light")}}catch(e){}` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cinzel:wght@600;700;800&family=Caveat:wght@400;500;600;700&family=Kalam:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#060402] selection:bg-amber-500/30 selection:text-amber-100">
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
