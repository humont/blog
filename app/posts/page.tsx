import Link from "next/link";
import { CategoryEmoji } from "@/lib/category-emoji";
import {
  asProse,
  formatShortDate,
  getCategoryCounts,
  getPostsSortedByDate,
  getYear,
  hostname,
  humanSize,
  type Post,
  postKind,
} from "@/lib/posts";

export const metadata = {
  title: "Posts",
  description: "Notes written here, and links to other people's pages",
};

const MODE = { note: "-rw-r--r--", link: "lrwxr-xr-x" };

function groupByYear(posts: Post[]): [number, Post[]][] {
  const groups = new Map<number, Post[]>();
  for (const post of posts) {
    const year = getYear(post.metadata.date);
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  const years = [...groups.keys()];
  const all: [number, Post[]][] = [];
  for (let year = Math.max(...years); year >= Math.min(...years); year--) {
    all.push([year, groups.get(year) ?? []]);
  }
  return all;
}

export default function PostsPage() {
  const posts = getPostsSortedByDate();
  const topics = getCategoryCounts(posts);
  const links = posts.filter((post) => postKind(post) === "link").length;
  const notes = posts.length - links;
  const firstYear =
    posts.length > 0 ? getYear(posts[posts.length - 1].metadata.date) : null;
  const filters = [
    { kind: "all", label: "--all", count: posts.length },
    { kind: "note", label: "--notes", count: notes },
    { kind: "link", label: "--links", count: links },
  ];

  return (
    <section className="archive" aria-labelledby="archive-heading">
      <p className="prompt">
        <span className="prompt-user">hugo@humont.dev</span> ~ ${" "}
        <span className="prompt-cmd">
          ls -lt posts/
          <span className="archive-grep" />
        </span>
      </p>

      <header className="archive-header">
        <h1 id="archive-heading">posts/</h1>
        {firstYear && (
          <p>
            {posts.length} entries since {firstYear}.{" "}
            <span className="kind-tag" data-kind="note">
              note
            </span>{" "}
            is something I wrote here;{" "}
            <span className="kind-tag" data-kind="link">
              link
            </span>{" "}
            points to someone else&rsquo;s page, with my take underneath. Mostly{" "}
            {topics.slice(0, 3).map(({ category }, i) => (
              <span key={category}>
                {i > 0 && (i === 2 ? " and " : ", ")}
                {asProse(category)}
              </span>
            ))}
            .
          </p>
        )}
      </header>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <>
          <fieldset className="archive-filter">
            <legend className="visually-hidden">Show</legend>
            {filters.map(({ kind, label, count }) => (
              <label key={kind}>
                <input
                  type="radio"
                  name="kind"
                  value={kind}
                  defaultChecked={kind === "all"}
                  className="visually-hidden"
                />
                {label} <span className="count">{count}</span>
              </label>
            ))}
          </fieldset>

          {groupByYear(posts).map(([year, yearPosts]) =>
            yearPosts.length === 0 ? (
              <p key={year} className="prompt archive-gap" aria-hidden="true">
                ${" "}
                <span className="prompt-cmd">
                  ls -lt posts/<span className="archive-year-glob">{year}</span>
                  -*
                </span>
                <span className="archive-gap-error">
                  zsh: no matches found: posts/{year}-*
                </span>
              </p>
            ) : (
              <section
                key={year}
                className="archive-year"
                aria-labelledby={`year-${year}`}
              >
                <h2 id={`year-${year}`} className="prompt">
                  <span aria-hidden="true">$ </span>
                  <span className="prompt-cmd">
                    <span aria-hidden="true">ls -lt posts/</span>
                    <span className="archive-year-glob">{year}</span>
                    <span aria-hidden="true">-*</span>
                    <span className="archive-grep" />
                  </span>
                </h2>
                <p className="archive-total" aria-hidden="true">
                  total{" "}
                  {(["all", "note", "link"] as const).map((kind) => (
                    <span key={kind} data-total={kind}>
                      {kind === "all"
                        ? yearPosts.length
                        : yearPosts.filter((post) => postKind(post) === kind)
                            .length}
                    </span>
                  ))}
                </p>
                <ol className="post-list">
                  {yearPosts.map((post) => {
                    const kind = postKind(post);
                    return (
                      <li key={post.slug} data-kind={kind}>
                        <span className="post-list-mode" aria-hidden="true">
                          {MODE[kind]}
                        </span>
                        <span className="post-list-size" aria-hidden="true">
                          {humanSize(post.bytes)}
                        </span>
                        <time dateTime={post.metadata.date}>
                          {formatShortDate(post.metadata.date)}
                        </time>
                        <span className="kind-tag" data-kind={kind}>
                          {kind}
                        </span>
                        <div className="post-list-entry">
                          <Link href={`/posts/${post.slug}`}>
                            {post.metadata.title}
                          </Link>
                          <p className="post-list-meta">
                            {post.metadata.url && (
                              <span className="post-list-source">
                                -&gt; {hostname(post.metadata.url)}
                              </span>
                            )}
                            {post.metadata.category.map((cat) => (
                              <span key={cat}>
                                <CategoryEmoji category={cat} />
                                {asProse(cat).toLowerCase()}
                              </span>
                            ))}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>
            ),
          )}
        </>
      )}

      <p className="prompt prompt-end" aria-hidden="true">
        <span className="prompt-user">hugo@humont.dev</span> ~ ${" "}
        <span className="cursor" />
      </p>
    </section>
  );
}
