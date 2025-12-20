import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Humont',
    template: '%s | Humont',
  },
  description: 'Personal blog and notes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Humont RSS Feed"
          href="/rss"
        />
      </head>
      <body>
        <header className="site-header">
          <Link
            href="/"
            className="site-title"
          >
            ~/humont.dev
          </Link>
          <nav
            className="site-nav"
            aria-label="Main navigation"
          >
            <Link href="/">./home</Link>
            <Link href="/notes">./notes</Link>
            <Link href="/links">./links</Link>
            <Link href="/rss">./rss</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          <p>
            <small>&copy; {new Date().getFullYear()} Humont</small>
          </p>
        </footer>
      </body>
    </html>
  );
}
