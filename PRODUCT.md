# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A mix, in this order:

1. **Hugo himself.** The site is a public notebook first: a place to think in writing and keep the results.
2. **Peers and curious readers.** Developers and others who arrive through RSS, syndicated copies of posts, or shared links, and read one or two pieces.
3. **People assessing Hugo professionally.** Prospective collaborators, clients, or employers who want a quick, credible picture of who he is and what he works on.

## Product Purpose

humont.dev is Hugo's personal site and the canonical home for his writing. Over the next year it has two jobs:

- **POSSE home base.** Publish on the site first, then syndicate elsewhere. The site is the primary, searchable, owned archive. Platforms are distribution only.
- **Long-form essays.** Thinking pieces, currently about AI and agentic coding, developer practice, health and exercise, and technology ethics.

It succeeds when writing is pleasant to publish, the archive stays readable and findable over time, and a visitor who lands on any post can tell whose site it is and find more.

## Positioning

A developer's owned, self-built writing home in the IndieWeb/POSSE tradition. It mixes technical depth (distributed systems, payments, data privacy, an MSc in Advanced Computer Science) with a non-standard background (a decade in the fitness industry and founding a gourmet protein company in Hong Kong). The breadth of topics is real and deliberate, not a niche to tidy away.

## Operating Context

- Posts are MDX files in `app/posts/content/`, named `YYYY-MM-DD-slug.mdx`, created with `bun scripts/new-post.ts` (`npm run new`) and written in an editor.
- Front matter: `title`, `date`, `category[]`, and optional `summary`, `image`, `url`.
- Readers arrive through the RSS feed (`/rss`), syndicated copies, and direct links. Many land straight on a single post, not the home page.
- Deployment is a static build pushed to Netlify (`npm run deploy`).

## Capabilities and Constraints

- **Stack:** Next.js 16 (App Router, React 19, React Compiler), `next-mdx-remote`, `rehype-pretty-code` + Shiki for code highlighting, Biome for lint/format. Plain global CSS in `app/globals.css`, no CSS framework.
- **Static only.** The output is a static export hosted on Netlify. No server runtime, database, comments, or auth.
- **Routes:** `/` (intro, about, stack), `/posts` (reverse-chronological list), `/posts/[slug]`, `/rss`.
- **Post types:** a post with a `url` is a **link** (commentary on an external piece, usually with a block quote). Any other post is a **note**. Link posts still exist but are not a growth priority.
- **Categories:** free-form tags with emoji markers in `lib/category-emoji.tsx` (Dev, Thoughts, AI, Exercise, Wisdom, etc.).
- **Legacy URLs:** `/notes/*` and `/links/*` 301 to `/posts/*` and must keep working (in `next.config.ts` and `public/_redirects`).
- **Archive:** posts date back to 2021. Old slugs and URLs must not break.
- **Open:** whether posts get syndication links (POSSE back-references), search, or category pages. Nothing is decided yet.

## Brand Commitments

- Name: **Humont** / **humont.dev**. Author: Hugo, a software developer based in the UK.
- Voice in posts: first person, informal, candid, a little wry. Hugo thinks out loud and isn't afraid to leave a thought unfinished.
- Category emoji markers (`lib/category-emoji.tsx`) are a deliberate personal touch. Hugo explicitly chose to keep them (5 Oct 2026).
- **Terminal character is a commitment.** Hugo asked to lean into the terminal theme (5 Oct 2026) and chose a `neofetch`-style home page. Terminal forms (prompts, command output, key-value sheets) are welcome in the frame. Long-form reading text stays in the sans.

## Evidence on Hand

- About 18 real posts from 2021 to 2026 in `app/posts/content/`.
- Biography and stack facts in `app/page.tsx`.
- Favicons in `app/`. No logo, portrait, or project screenshots are in the repo.
- There are no testimonials, client logos, project case studies, or metrics. Future work must not invent any.

## Product Principles

1. **The site is the source of truth.** Every post lives here first and can be addressed permanently. Syndication points back to it.
2. **Writing over chrome.** The reading experience of a single post comes before everything else, because that is where most visitors land.
3. **Publishing stays frictionless.** A new post is one MDX file. Nothing should make writing slower.
4. **Breadth is a feature.** AI, code, health, and ethics live side by side. Structure should help readers navigate that range without splitting it into separate silos.
5. **Owned and durable.** Static, portable, and dependency-light, so it can last for years with links that never break.

## Accessibility & Inclusion

No specific requirement has been established beyond sensible WCAG AA practice for a reading site. Category emoji are already marked `aria-hidden`.
