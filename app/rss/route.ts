import { getPostsSortedByDate, Post } from '@/lib/posts';

export const dynamic = 'force-static';

const SITE_URL = 'https://humont.dev';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRssDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toUTCString();
}

function generateRssItem(post: Post): string {
  const link = `${SITE_URL}/posts/${post.slug}`;
  const description = post.metadata.summary || post.content.slice(0, 200) + '...';

  return `    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${formatRssDate(post.metadata.date)}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
}

function generateRssFeed(posts: Post[]): string {
  const items = posts.map(generateRssItem).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Humont</title>
    <link>${SITE_URL}</link>
    <description>Personal blog and notes</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

export function GET() {
  const allPosts = getPostsSortedByDate().slice(0, 10);

  const feed = generateRssFeed(allPosts);

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
