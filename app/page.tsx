import Link from "next/link";
import {
  asProse,
  formatListDate,
  formatShortDate,
  getCategoryCounts,
  getPostsSortedByDate,
  getYear,
  isLink,
  type Post,
} from "@/lib/posts";

const NOW_UPDATED = "2026-10-05";

const LOGO = [
  "███     ███",
  "███     ███",
  "███     ███",
  "███     ███",
  "███████████",
  "███     ███",
  "███     ███",
  "███     ███",
  "███     ███",
];

const stack: [string, string][] = [
  ["Languages", "TypeScript, JavaScript, HTML, CSS, SQL, GraphQL, Java"],
  ["Runtime", "Node, React, Next.js, PostgreSQL, Hasura, Apollo"],
  ["Ships to", "Docker, Kamal, Dokku, Netlify, Vercel, any VPS"],
  ["Integrates", "Stripe, Render, Postmark"],
];

const history = [
  {
    when: "2026",
    what: "GM Squire, Bookwish.",
  },
  {
    when: "2018–2026",
    what: "Founding Software Engineer at In Practise.",
  },
  {
    when: "2018",
    what: "MSc in Advanced Computer Science: distributed computing, data privacy and ethics.",
  },
  { when: "20s", what: "Ran a gourmet protein company in Hong Kong." },
  { when: "20s", what: "Worked in the fitness industry." },
];

function sheetDate(date: string): string {
  return `${formatShortDate(date)} ${getYear(date)}`;
}

function listOf(words: string[]): string {
  if (words.length < 2) return words.join("");
  return `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}`;
}

function kindOf(post: Post): string {
  if (isLink(post)) return "link";
  return asProse(post.metadata.category[0] ?? "note").toLowerCase();
}

export default function Page() {
  const posts = getPostsSortedByDate();
  const topics = getCategoryCounts(posts);
  const recentTopics = [
    ...new Set(posts.slice(0, 5).flatMap((post) => post.metadata.category)),
  ]
    .filter((topic) => topic !== "Thoughts")
    .map((topic) => asProse(topic));
  const firstYear =
    posts.length > 0 ? getYear(posts[posts.length - 1].metadata.date) : null;
  const strays = topics.length - 4;

  return (
    <div className="home">
      <p className="prompt">
        <span className="prompt-user">hugo@humont.dev</span> ~ ${" "}
        <span className="prompt-cmd">humontfetch</span>
      </p>

      <section className="fetch" aria-labelledby="fetch-heading">
        <div className="fetch-logo" aria-hidden="true">
          {["shade", "ink"].map((layer) => (
            <div key={layer} className={`fetch-logo-${layer}`}>
              {LOGO.flatMap((line, row) =>
                [...line].map((cell, col) => (
                  <i
                    key={`${row}-${col}`}
                    data-on={cell === "█" || undefined}
                  />
                )),
              )}
            </div>
          ))}
        </div>

        <div className="fetch-sheet">
          <h1 id="fetch-heading" className="fetch-who">
            <span className="fetch-user">hugo</span>
            <span className="fetch-host">@humont.dev</span>
          </h1>
          <dl className="fetch-spec">
            <div>
              <dt>Role</dt>
              <dd>
                Full stack Senior Software Engineer{" "}
                <span className="aside">· UK</span>
              </dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>
                Web apps and sites with payments infrastructures: B2C,
                marketplaces, products and subscriptions
              </dd>
            </div>
            {recentTopics.length > 0 && (
              <div>
                <dt>Lately</dt>
                <dd>Writing about {listOf(recentTopics)}</dd>
              </div>
            )}
            {firstYear && (
              <div>
                <dt>Writing</dt>
                <dd>
                  {posts.length} posts since {firstYear}{" "}
                  <span className="aside">
                    · latest{" "}
                    <time dateTime={posts[0].metadata.date}>
                      {sheetDate(posts[0].metadata.date)}
                    </time>
                  </span>
                </dd>
              </div>
            )}
            {topics.length > 0 && (
              <div>
                <dt>Topics</dt>
                <dd>
                  {topics.slice(0, 4).map(({ category, count }, i) => (
                    <span key={category}>
                      {i > 0 && <span className="aside"> · </span>}
                      {asProse(category).toLowerCase()} {count}
                    </span>
                  ))}
                  {strays > 0 && (
                    <span className="aside"> · +{strays} more</span>
                  )}
                </dd>
              </div>
            )}
            {stack.map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            <div>
              <dt>Updated</dt>
              <dd>
                <time dateTime={NOW_UPDATED}>{sheetDate(NOW_UPDATED)}</time>
              </dd>
            </div>
          </dl>
          <div className="fetch-swatches" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </section>

      <div className="home-below">
        <section className="ls" aria-labelledby="ls-heading">
          <h2 id="ls-heading" className="prompt">
            $ <span className="prompt-cmd">ls -t posts/ | head</span>
          </h2>
          <ol className="ls-list">
            {posts.slice(0, 8).map((post) => (
              <li key={post.slug}>
                <time dateTime={post.metadata.date}>
                  {formatListDate(post.metadata.date)}
                </time>
                <Link href={`/posts/${post.slug}`}>{post.metadata.title}</Link>
                <span className="ls-kind">{kindOf(post)}</span>
              </li>
            ))}
          </ol>
          <p className="ls-all">
            <Link href="/posts">cd posts/</Link>{" "}
            <span className="aside">all {posts.length} posts</span>
          </p>
        </section>

        <section className="history" aria-labelledby="history-heading">
          <h2 id="history-heading" className="prompt">
            $ <span className="prompt-cmd">history</span>
          </h2>
          <ol className="history-list">
            {history.map(({ when, what }) => (
              <li key={what}>
                <span className="history-when">{when}</span>
                <p>{what}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <p className="prompt prompt-end" aria-hidden="true">
        <span className="prompt-user">hugo@humont.dev</span> ~ ${" "}
        <span className="cursor" />
      </p>
    </div>
  );
}
