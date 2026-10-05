"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SitePath() {
  const segments = usePathname().split("/").filter(Boolean);

  return (
    <p className="site-path">
      <Link
        href="/"
        className="site-title"
        aria-current={segments.length === 0 ? "page" : undefined}
      >
        ~/humont.dev
      </Link>
      {segments.map((segment, i) => {
        const href = `/${segments.slice(0, i + 1).join("/")}`;
        const isLast = i === segments.length - 1;
        return (
          <span key={href} className="site-path-segment">
            <span className="site-path-sep" aria-hidden="true">
              /
            </span>
            {isLast ? (
              <span aria-current="page">{segment}</span>
            ) : (
              <Link href={href}>{segment}</Link>
            )}
          </span>
        );
      })}
    </p>
  );
}

export function SiteNav() {
  const section = usePathname().split("/")[1];

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <Link
        href="/posts"
        aria-current={section === "posts" ? "true" : undefined}
      >
        posts/
      </Link>
      <a href="/rss">rss</a>
    </nav>
  );
}
