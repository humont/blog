import Link from "next/link";
import { getPostsSortedByDate, formatDate, isLink } from "@/lib/posts";
import { CategoryEmoji } from "@/lib/category-emoji";

export const metadata = {
  title: "Posts",
  description: "Blog posts and links",
};

export default function PostsPage() {
  const posts = getPostsSortedByDate();

  return (
    <section>
      <h2>Posts</h2>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <header>
                  <time dateTime={post.metadata.date}>
                    {formatDate(post.metadata.date)}
                  </time>
                  <span className={`post-type ${isLink(post) ? "post-type--link" : "post-type--note"}`}>
                    {isLink(post) ? "[link]:" : "[note]:"}
                  </span>
                  <h3>
                    <Link href={`/posts/${post.slug}`}>{post.metadata.title}</Link>
                  </h3>
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
                </header>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
