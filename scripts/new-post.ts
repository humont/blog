const title = process.argv[2] || "";
const today = new Date().toISOString().split("T")[0];
const filename = title ? `${today}-${title}.mdx` : `${today}.mdx`;
const filepath = `app/posts/content/${filename}`;

const frontmatter = `---
title: '${title}'
date: '${today}'
category: []
url: ''
---

`;

await Bun.write(filepath, frontmatter);
console.log(`Created: ${filepath}`);

export {};
