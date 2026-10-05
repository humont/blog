import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { SiteNav, SitePath } from "@/lib/site-path";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Humont",
    template: "%s | Humont",
  },
  description: "Personal blog and notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Humont RSS Feed"
          href="/rss"
        />
      </head>
      <body>
        <header className="site-header" id="top">
          <SitePath />
          <SiteNav />
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <p>&copy; {new Date().getFullYear()} Humont</p>
          <nav aria-label="Footer">
            <a href="/rss">rss</a>
            <a href="#top">top</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
