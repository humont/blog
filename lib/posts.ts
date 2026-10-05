import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  date: string;
  summary?: string;
  image?: string;
  category: string[];
  url?: string;
  syndication: string[];
};

export type Post = {
  metadata: Metadata;
  slug: string;
  content: string;
  bytes: number;
};

function parseFrontmatter(
  fileContent: string,
): { metadata: Metadata; content: string } | null {
  if (!fileContent.trim()) {
    return null;
  }

  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return null;
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = { category: [], syndication: [] };

  for (const line of frontMatterLines) {
    const colonIndex = line.indexOf(": ");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 2).trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");

    if (key === "category" || key === "syndication") {
      const arrayMatch = value.match(/^\[(.*)\]$/);
      const items = arrayMatch ? arrayMatch[1].split(",") : value.split(",");
      metadata[key] = items
        .map((v) => v.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    } else {
      (metadata as Record<string, string>)[key] = value;
    }
  }

  if (!metadata.title || !metadata.date) {
    return null;
  }

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const parsed = parseFrontmatter(rawContent);
  return parsed && { ...parsed, bytes: Buffer.byteLength(rawContent) };
}

function getMDXData(dir: string): Post[] {
  const mdxFiles = getMDXFiles(dir);
  const posts: Post[] = [];

  for (const file of mdxFiles) {
    const result = readMDXFile(path.join(dir, file));
    if (result) {
      const slug = path.basename(file, path.extname(file));
      posts.push({ slug, ...result });
    }
  }

  return posts;
}

export function isLink(post: Post): boolean {
  return !!post.metadata.url;
}

export function postKind(post: Post): "note" | "link" {
  return isLink(post) ? "link" : "note";
}

export function getPosts(): Post[] {
  return getMDXData(path.join(process.cwd(), "app", "posts", "content"));
}

export function getPost(slug: string): Post | undefined {
  const posts = getPosts();
  return posts.find((post) => post.slug === slug);
}

export function getPostsSortedByDate(): Post[] {
  return getPosts().sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );
}

function toDate(date: string): Date {
  return new Date(date.includes("T") ? date : `${date}T00:00:00`);
}

export function formatDate(date: string): string {
  return toDate(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(date: string): string {
  return toDate(date)
    .toLocaleDateString("en-GB", { day: "numeric", month: "short" })
    .replace(/(\w{3})\w*/, "$1");
}

export function formatListDate(date: string): string {
  return toDate(date)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/(\w{3})\w*/, "$1");
}

export function getYear(date: string): number {
  return toDate(date).getFullYear();
}

export function readingMinutes(post: Post): number {
  const words = post.content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export function getAdjacentPosts(slug: string): { newer?: Post; older?: Post } {
  const posts = getPostsSortedByDate();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  return { newer: posts[index - 1], older: posts[index + 1] };
}

export function getCategoryCounts(
  posts: Post[],
): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const category of post.metadata.category) {
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

export function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  return `${(bytes / 1024).toFixed(1)}K`;
}

export function sourcePath(url: string): string {
  try {
    const { pathname, search } = new URL(url);
    return `${pathname}${search}`.replace(/\/$/, "");
  } catch {
    return "";
  }
}

export function asProse(category: string): string {
  return category === category.toUpperCase()
    ? category
    : category.toLowerCase();
}
