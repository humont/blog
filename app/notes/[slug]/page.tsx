import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPost, getPosts, formatDate } from "@/lib/posts";
import { CategoryEmoji } from "@/lib/category-emoji";

export async function generateStaticParams() {
  const posts = getPosts("notes");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("notes", slug);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.summary || `Note: ${post.metadata.title}`,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("notes", slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header>
        <h1>{post.metadata.title}</h1>
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
        <MDXRemote source={post.content} />
      </section>
    </article>
  );
}
