import Link from "next/link";
import { getPostsSortedByDate, formatDate } from "@/lib/posts";
import { CategoryEmoji } from "@/lib/category-emoji";

export const metadata = {
  title: "Notes",
  description: "Blog posts and notes",
};

export default function NotesPage() {
  const posts = getPostsSortedByDate("notes");

  return (
    <section>
      <h2>Notes</h2>

      {posts.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <header>
                  <h3>
                    <Link href={`/notes/${post.slug}`}>{post.metadata.title}</Link>
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
