import type { Element, ElementContent, Root } from "hast";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import type { PluggableList } from "unified";

const rehypePrettyCodeOptions: Options = {
  theme: "github-dark",
  keepBackground: true,
};

function textOf(node: ElementContent): string {
  if (node.type === "text") return node.value;
  if (node.type === "element") return node.children.map(textOf).join("");
  return "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

function rehypeSectionAnchors() {
  return (tree: Root) => {
    const used = new Map<string, number>();
    for (const node of tree.children) {
      if (node.type !== "element" || !["h2", "h3"].includes(node.tagName)) {
        continue;
      }
      const base = slugify(textOf(node)) || "section";
      const seen = used.get(base) ?? 0;
      used.set(base, seen + 1);
      const id = seen ? `${base}-${seen}` : base;
      const anchor: Element = {
        type: "element",
        tagName: "a",
        properties: {
          className: ["section-anchor"],
          href: `#${id}`,
          ariaHidden: "true",
          tabIndex: -1,
        },
        children: [
          { type: "text", value: "#".repeat(Number(node.tagName[1])) },
        ],
      };
      node.properties.id = id;
      node.children.unshift(anchor);
    }
  };
}

export const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      rehypeSectionAnchors,
      [rehypePrettyCode, rehypePrettyCodeOptions],
    ] as PluggableList,
  },
};
