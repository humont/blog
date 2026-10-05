import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Fragment } from "react";
import { CategoryEmoji } from "@/lib/category-emoji";
import { mdxOptions } from "@/lib/mdx-options";
import { Permalink } from "@/lib/permalink";
import {
  asProse,
  formatListDate,
  getAdjacentPosts,
  getPost,
  getPosts,
  hostname,
  isLink,
  type Post,
  postKind,
  readingMinutes,
  sourcePath,
} from "@/lib/posts";

const SITE_URL = "https://humont.dev";

function BreakableUrlPath({ path }: { path: string }) {
  const [first, ...rest] = path.split("/");
  let prefix = first;
  return [
    first,
    ...rest.map((segment) => {
      prefix = `${prefix}/${segment}`;
      return (
        <Fragment key={prefix}>
          /<wbr />
          {segment}
        </Fragment>
      );
    }),
  ];
}

function PagerLink({ post, rel }: { post: Post; rel: "prev" | "next" }) {
  const kind = postKind(post);
  return (
    <Link href={`/posts/${post.slug}`} rel={rel} className="post-pager-row">
      <span className="post-pager-dir">
        {rel === "next" ? "newer" : "older"}
      </span>{" "}
      <time dateTime={post.metadata.date}>
        {formatListDate(post.metadata.date)}
      </time>{" "}
      <span className="post-pager-title">{post.metadata.title}</span>{" "}
      <span className="kind-tag" data-kind={kind}>
        {kind}
      </span>
    </Link>
  );
}

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Not Found" };
  }

  const prefix = isLink(post) ? "Link" : "Note";
  return {
    title: post.metadata.title,
    description: post.metadata.summary || `${prefix}: ${post.metadata.title}`,
    alternates: { canonical: `${SITE_URL}/posts/${post.slug}` },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const { newer, older } = getAdjacentPosts(slug);
  const { url, syndication, category } = post.metadata;
  const kind = postKind(post);

  return (
    <article className="post h-entry" data-kind={kind}>
      <p className="prompt post-prompt">
        <span className="prompt-user">hugo@humont.dev</span> ~ ${" "}
        <span className="prompt-cmd">less posts/{post.slug}.mdx</span>
      </p>

      <header className="post-header">
        <h1 className="p-name">{post.metadata.title}</h1>
        {url && (
          <p className="post-source">
            <span className="post-source-label">link →</span>
            <a href={url} rel="noopener noreferrer">
              <span className="post-source-host">{hostname(url)}</span>
              <span className="post-source-path">
                <BreakableUrlPath path={sourcePath(url)} />
              </span>
            </a>
          </p>
        )}
      </header>

      <div className="post-rail">
        <dl className="post-meta">
          <div>
            <dt>kind</dt>
            <dd>
              <span className="kind-tag" data-kind={kind}>
                {kind}
              </span>
            </dd>
          </div>
          <div>
            <dt>date</dt>
            <dd>
              <time className="dt-published" dateTime={post.metadata.date}>
                {formatListDate(post.metadata.date)}
              </time>
            </dd>
          </div>
          <div>
            <dt>read</dt>
            <dd>{readingMinutes(post)} min</dd>
          </div>
          <div className="post-meta-at" aria-hidden="true">
            <dt>at</dt>
            <dd className="post-progress" />
          </div>
          {category.length > 0 && (
            <div className="post-meta-topics">
              <dt>topics</dt>
              <dd>
                <ul className="post-categories">
                  {category.map((cat) => (
                    <li key={cat}>
                      <CategoryEmoji category={cat} />
                      {asProse(cat).toLowerCase()}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="post-body e-content">
        <MDXRemote source={post.content} options={mdxOptions} />
        <p className="post-end" aria-hidden="true">
          <span>(END)</span>
        </p>
      </div>

      <footer className="post-footer">
        {url && (
          <p className="post-original">
            <a href={url} rel="noopener noreferrer">
              Read the original on {hostname(url)} ↗
            </a>
          </p>
        )}
        <p className="post-canonical">This {kind} lives at</p>
        <Permalink path={`/posts/${post.slug}`} />
        {syndication.length > 0 && (
          <>
            <p className="post-canonical">Also posted to</p>
            <ul className="post-syndication">
              {syndication.map((link) => (
                <li key={link}>
                  <a
                    href={link}
                    className="u-syndication"
                    rel="syndication noopener noreferrer"
                  >
                    {hostname(link)}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        {(newer || older) && (
          <nav className="post-pager" aria-label="More posts">
            {newer && <PagerLink post={newer} rel="next" />}
            {older && <PagerLink post={older} rel="prev" />}
          </nav>
        )}

        <p className="prompt prompt-end">
          <span className="prompt-user">hugo@humont.dev</span> ~ ${" "}
          <Link href="/posts">cd posts/</Link>{" "}
          <span className="cursor" aria-hidden="true" />
        </p>
      </footer>
    </article>
  );
}
