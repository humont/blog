import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  date: string;
  summary?: string;
  image?: string;
  category: string[];
  url?: string;
};

export type Post = {
  metadata: Metadata;
  slug: string;
  content: string;
};

function parseFrontmatter(fileContent: string): { metadata: Metadata; content: string } | null {
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
  const metadata: Partial<Metadata> = { category: [] };

  for (const line of frontMatterLines) {
    const colonIndex = line.indexOf(": ");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 2).trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");

    if (key === "category") {
      const arrayMatch = value.match(/^\[(.*)\]$/);
      metadata.category = arrayMatch
        ? arrayMatch[1].split(",").map((v) => v.trim().replace(/^['"]|['"]$/g, ""))
        : value.split(",").map((v) => v.trim());
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
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string): Post[] {
  const mdxFiles = getMDXFiles(dir);
  const posts: Post[] = [];

  for (const file of mdxFiles) {
    const result = readMDXFile(path.join(dir, file));
    if (result) {
      const slug = path.basename(file, path.extname(file));
      posts.push({ metadata: result.metadata, slug, content: result.content });
    }
  }

  return posts;
}

export function getPosts(type: "notes" | "links"): Post[] {
  return getMDXData(path.join(process.cwd(), "app", type, "posts"));
}

export function getPost(type: "notes" | "links", slug: string): Post | undefined {
  const posts = getPosts(type);
  return posts.find((post) => post.slug === slug);
}

export function getPostsSortedByDate(type: "notes" | "links"): Post[] {
  return getPosts(type).sort(
    (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
}

export function formatDate(date: string, includeRelative = false): string {
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const year = targetDate.getFullYear();
  const month = targetDate.toLocaleString("en-us", { month: "long" });
  const day = targetDate.getDate();
  const fullDate = `${year}, ${month}, ${day}`;

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
