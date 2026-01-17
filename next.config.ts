import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/notes/:slug",
        destination: "/posts/:slug",
        permanent: true,
      },
      {
        source: "/links/:slug",
        destination: "/posts/:slug",
        permanent: true,
      },
      {
        source: "/notes",
        destination: "/posts",
        permanent: true,
      },
      {
        source: "/links",
        destination: "/posts",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
