import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPost, getPosts, formatDate } from "@/lib/posts";
import { CategoryEmoji } from "@/lib/category-emoji";
import { mdxOptions } from "@/lib/mdx-options";

export async function generateStaticParams() {
  const posts = getPosts("links");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("links", slug);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.summary || `Link: ${post.metadata.title}`,
  };
}

export default async function LinkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("links", slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header>
        <h1>
          {post.metadata.url ? (
            <a href={post.metadata.url} target="_blank" rel="noopener noreferrer">
              {post.metadata.title}
            </a>
          ) : (
            post.metadata.title
          )}
        </h1>
        <time dateTime={post.metadata.date}>
          {formatDate(post.metadata.date)}
        </time>
        {post.metadata.category.length > 0 && (
          <div className="tags" aria-label="Categories">
            {post.metadata.category.map((cat) => (
              <span key={cat}>
                <CategoryEmoji category={cat} />
                {cat}
              </span>
            ))}
          </div>
        )}
      </header>

      <section>
        <MDXRemote source={post.content} options={mdxOptions} />
      </section>
    </article>
  );
}
