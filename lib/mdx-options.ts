import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import type { PluggableList } from "unified";

const rehypePrettyCodeOptions: Options = {
  theme: "github-dark",
  keepBackground: true,
};

export const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions],
    ] as PluggableList,
  },
};
