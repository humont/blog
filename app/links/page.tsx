import Link from "next/link";
import { getPostsSortedByDate, formatDate } from "@/lib/posts";
import { CategoryEmoji } from "@/lib/category-emoji";

export const metadata = {
  title: "Links",
  description: "Interesting links and resources",
};

export default function LinksPage() {
  const posts = getPostsSortedByDate("links");

  return (
    <section>
      <h2>Links</h2>

      {posts.length === 0 ? (
        <p>No links yet.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <header>
                  <h3>
                    <Link href={`/links/${post.slug}`}>{post.metadata.title}</Link>
                  </h3>
                  <time dateTime={post.metadata.date}>
                    {formatDate(post.metadata.date)}
                  </time>
                </header>
                {post.metadata.category.length > 0 && (
                  <div className="tags">
                    {post.metadata.category.map((cat) => (
                      <span key={cat}>
                        <CategoryEmoji category={cat} />
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
