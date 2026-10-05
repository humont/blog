---
name: Humont
description: Hugo's owned writing home; a dated, hairline-ruled notebook in mono and sans, framed as a terminal.
colors:
  primary: "light-dark(oklch(45% 0.2 350), oklch(85% 0.12 350))"
  primary-hover: "light-dark(oklch(55% 0.25 350), oklch(75% 0.2 350))"
  paper: "light-dark(oklch(98.42% 0.0034 247.9), oklch(20.77% 0.0398 265.8))"
  ink: "light-dark(oklch(29.05% 0.027 257.5), oklch(96.83% 0.0069 247.9))"
  ink-muted: "light-dark(oklch(55.44% 0.0407 257.4), oklch(71.07% 0.0351 256.8))"
  ink-faint: "light-dark(oklch(75% 0.02 257), oklch(48% 0.035 258))"
  hairline: "light-dark(oklch(92.88% 0.0126 255.5), oklch(37.17% 0.0392 257.3))"
  code-slate: "light-dark(oklch(27.95% 0.0368 260), oklch(12.88% 0.0406 264.7))"
  code-ink: "oklch(92.88% 0.0126 255.5)"
  code-ink-muted: "oklch(70% 0.03 260)"
  selection: "oklch(65% 0.2 350 / 0.3)"
typography:
  headline:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title-prose:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.7
  list-title:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)"
    fontWeight: 550
    lineHeight: 1.4
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(0.875rem, 0.8rem + 0.25vw, 1rem)"
    fontWeight: 400
    fontFeature: "tnum"
  label-sm:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    fontFeature: "tnum"
  sheet:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(0.875rem, 0.8rem + 0.25vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.6
  sheet-key:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(0.875rem, 0.8rem + 0.25vw, 1rem)"
    fontWeight: 600
    lineHeight: 1.6
rounded:
  focus: "2px"
  code-inline: "3px"
  image: "4px"
  code-block: "6px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "2rem"
  xl: "4rem"
components:
  link:
    textColor: "{colors.primary}"
  link-hover:
    textColor: "{colors.primary-hover}"
  wordmark:
    textColor: "{colors.primary}"
    typography: "{typography.title}"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.primary}"
  list-entry:
    textColor: "{colors.ink}"
    typography: "{typography.list-title}"
    padding: "0.6rem 0"
  list-entry-hover:
    textColor: "{colors.primary}"
  prompt:
    textColor: "{colors.ink-muted}"
    typography: "{typography.sheet}"
  prompt-user:
    textColor: "{colors.primary}"
  prompt-command:
    textColor: "{colors.ink}"
  fetch-title:
    textColor: "{colors.ink-muted}"
    typography: "{typography.title}"
    padding: "0 0 {spacing.sm} 0"
  fetch-title-user:
    textColor: "{colors.primary}"
  fetch-key:
    textColor: "{colors.primary}"
    typography: "{typography.sheet-key}"
  fetch-value:
    textColor: "{colors.ink}"
    typography: "{typography.sheet}"
  fetch-aside:
    textColor: "{colors.ink-muted}"
  block-mark-cell:
    backgroundColor: "{colors.primary}"
  ls-entry:
    textColor: "{colors.ink}"
    typography: "{typography.list-title}"
    padding: "0.45rem 0"
  ls-entry-hover:
    textColor: "{colors.primary}"
  ls-kind:
    textColor: "{colors.ink-muted}"
    typography: "{typography.sheet}"
  history-when:
    textColor: "{colors.primary}"
    typography: "{typography.sheet}"
  cursor:
    backgroundColor: "{colors.primary}"
    width: "0.6em"
    height: "1.15em"
  code-block:
    backgroundColor: "{colors.code-slate}"
    textColor: "{colors.code-ink}"
    rounded: "{rounded.code-block}"
    padding: "{spacing.md}"
  code-inline:
    backgroundColor: "{colors.code-slate}"
    textColor: "{colors.code-ink}"
    rounded: "{rounded.code-inline}"
    padding: "0 0.3em"
---

# Design System: Humont

## Overview

**Creative North Star: "The Dated Notebook"**

humont.dev reads like a working notebook kept in public: every entry carries its date, sections are divided by a single hairline, and the page is paper and ink with one pink pen. Headings, dates, counts and labels are set in JetBrains Mono; everything meant to be read at length is set in the system sans. The mono carries structure and time, the sans carries thought.

Density is relaxed but not airy. Content sits in a 40rem reading measure inside a 72rem site frame; wider viewports gain a narrow left rail (dates, years, post metadata) rather than wider text. There are no surfaces stacked on surfaces: no cards, no tag chips, no shadows. Lists are rows separated by hairlines, with a mono date column on the left.

Light and dark are one system, not two: every colour token is a `light-dark()` pair in OKLCH, and the page follows the visitor's `color-scheme`.

The notebook is kept at a terminal. Terminal character is an owner commitment (5 Oct 2026): prompts, command output and key-value sheets are welcome in the frame, beside the `~/humont.dev` wordmark. The home page reports Hugo the way `neofetch` reports a machine: a prompt line, a pink block-letter mark beside a key-value spec sheet, `ls` and `history` output, and a blinking cursor at the end. Long-form reading text stays in the sans, inside or outside the terminal frame.

**Key Characteristics:**
- Mono for structure (headings, dates, counts, labels); system sans for reading.
- One pink accent, used for links and for the few emphasised turning points in a passage.
- Hairline rules (1px, `hairline`) are the only dividers.
- Dates are always present, always mono, always tabular.
- A left rail at wide sizes for dates, years and post metadata; single column below.
- Category emoji next to category names, by the owner's choice.
- Terminal forms in the frame: prompt lines, command output, key-value spec sheets.

## Colors

A cool slate paper-and-ink neutral pair with a single magenta-pink accent, each defined as a light/dark OKLCH pair.

### Primary
- **Notebook Pink** (`primary`): links, the wordmark, archive year headings, the "Link" kind marker, the blockquote rule, the focus ring; on the home page, the `user@host` in prompt lines, the user name in the fetch title, spec-sheet keys, `history` when-values, and the three fills named in the Pink-As-Fill exception. Deep pink on light paper, soft pink on dark.
- **Pink Pressed** (`primary-hover`): hover state for links only.

### Neutral
- **Slate Paper** (`paper`): page background.
- **Slate Ink** (`ink`): body text, headings, list titles and nav links at rest.
- **Pencil Grey** (`ink-muted`): dates, counts, footer, metadata labels, list markers; prompt `~ $` and the host in the fetch title, spec-sheet asides, `ls` kinds.
- **Faint Graphite** (`ink-faint`): a non-text tone. Used only for the block mark's dither shade and its own swatch in the palette strip. It fails text contrast and is never used for text.
- **Hairline** (`hairline`): every rule: header and footer borders, section heads, between list rows, archive year bands, `hr`.
- **Code Slate** (`code-slate`) with **Code Ink** (`code-ink`): code blocks and inline code. Code is dark in both modes; syntax colours come from the Shiki `github-dark` theme.
- **Code Pencil** (`code-ink-muted`): secondary text on the code slate only: the language tag and the code-block scrollbar.
- **Selection Pink** (`selection`): text selection wash.

### Named Rules
**The One Pen Rule.** Pink is the only hue on the page outside code. It marks links, a handful of emphasised phrases per passage, and the terminal's own pink parts (prompt user, spec keys, `history` when-values). It never fills a background or a block, with the one exception below.

**The Pink-As-Fill Exception.** Exactly three things fill with pink: the block mark's cells, the blinking cursor, and the pink swatches in the palette strip. Two tints are also allowed: the 7% pink hover wash on archive rows (an owner decision, 5 Oct 2026) and the selection wash. Nothing else, including backgrounds, panels, other highlights and buttons, fills with pink.

**The Faint Is Not Text Rule.** `ink-faint` is a shade, not a text colour. It appears only in the block mark's dither and its swatch. Decorative punctuation in terminal forms (kind brackets, `---` fences, `- ` list marks, `##` anchors) is still text and takes `ink-muted`.

**The Paired Token Rule.** Every new colour is declared once as a `light-dark()` OKLCH pair on `:root`. No colour is chosen per mode inside a component.

## Typography

**Display Font:** JetBrains Mono (with monospace), self-hosted via next/font, Latin subset, weights 400 and 600
**Body Font:** system sans (`ui-sans-serif, system-ui, sans-serif`)
**Label/Mono Font:** JetBrains Mono, same family as display

**Character:** A monospaced voice for the frame and the timestamps, a neutral system sans for the words. Headings stay at regular weight; hierarchy comes from size and the mono/sans switch, not from bold.

### Hierarchy
- **Headline** (400, `headline`, -0.02em): page titles: post title, "Posts".
- **Title** (400, `title`): the home fetch title (`hugo@humont.dev`, tracking 0), archive years, post `h3`, the wordmark.
- **Title Prose** (400, `title-prose`): `h2` inside a post body.
- **Body** (400, `body`, 1.6 below 40rem, 1.7 above): all reading text, in a 40rem measure. Leading opens up with the measure: a phone's ~38ch line takes 1.6, the full 40rem line 1.7. Paragraphs, list items and blockquotes use `text-wrap: pretty`, headings `balance`; headings break overlong words. Opening quotes hang (`hanging-punctuation: first`). Strong is 650.
- **List Title** (550, 1.4): post titles in lists and the Writing column; ink at rest, pink on hover.
- **Label** (400, `label`, tabular figures): dates, counts, nav links, "Updated" line, "All posts" links.
- **Label Small** (400, 0.75rem, tabular): metadata terms (Published, Kind, Filed under), Older/Newer pager labels.
- **Sheet** (400, `sheet`, 1.6): the home terminal frame: prompt lines, spec-sheet values and asides, `ls` dates and kinds, `history` when-values. Prompt lines double as the home's section headings (`h2`) at this size.
- **Sheet Key** (600, `sheet`): spec-sheet keys only, plus the user name in the fetch title.

### Named Rules
**The Mono Means Structure Rule.** If it names a section, counts something, or says when, it is mono. If it is meant to be read as prose, it is sans. Terminal output (prompts, spec-sheet values) is structure and stays mono; sentences inside it (post titles in `ls`, `history` entries) are sans.

**The Tabular Date Rule.** Every `time` and count is mono with `tabular-nums` in `ink-muted`, so date columns align. A date that is itself a spec-sheet value takes the value's `ink`.

**The Glyph-Free Mark Rule.** The self-hosted JetBrains Mono subset has no box-drawing or block glyphs. Never set block art, box rules or bars as text; draw them as CSS cells.

## Layout

The body is a centred frame (max 72rem) with fluid side padding (`clamp(1rem, 4vw, 3rem)`). Reading content is capped at 40rem. Spacing uses five steps (xs 0.25rem, sm 0.5rem, md 1rem, lg 2rem, xl 4rem); pages open with xl or lg top padding, and the footer sits xl below content.

- **Post** (≥60rem): two columns, a 13rem meta rail and the 40rem body, gap `clamp(2.5rem, 6vw, 5rem)`. The prompt, header and footer sit in the body column; the rail starts level with the body and is sticky. On screens of 60rem and up that can hover, a post page dims its chrome so the article leads: the site header and the whole rail column (a full-height `.post-rail` wrapper, so the empty column below the meta counts) sit at 55% opacity and return to full on hover or keyboard focus within. The fade back to full takes 0.12s, the dim 0.25s, both `ease-in-out` so the change reads as a fade; there is no transition under reduced motion. Below 60rem the same meta block stacks between the title and the body.
- **Archive**: the page is `ls -lt posts/` output in the mono `sheet` voice, xl top padding, years capped at 62rem. A prompt line, then the pink `posts/` headline with a sans intro in the 40rem measure, then the filter row, then one block per year from newest to oldest, lg apart. Rows: below 40rem the date and kind share a line with the entry beneath; at ≥40rem a 4.5rem date, a 4.25rem kind and the entry; at ≥60rem a 6.5rem mode and a 3rem right-aligned size column lead the row, like `ls -l`.
- **Home**: the whole page sits in the mono `sheet` voice, xl top padding. A prompt line (`humontfetch`) opens it. Below, the fetch: single column (mark above sheet) under 48rem; at ≥48rem an auto-width mark column beside the sheet, gap `clamp(2rem, 5vw, 3.5rem)`, top-aligned. The mark is an 11 × 9 cell grid, cell `clamp(0.55rem, 0.3rem + 0.9vw, 0.9rem)` wide and 1.75 cells tall, padded one cell on the right and bottom to hold its shade. The sheet: the fetch title (max 18ch) closed by a hairline, then the spec list (max 48rem) with a 5.75rem key column (7.5rem at ≥48rem), then the swatch strip. A hairline and lg padding then open the lower band, xl below the fetch: `ls` (7fr) beside `history` (5fr) at ≥60rem, stacked below. A closing prompt with the cursor sits xl below.
- **`ls` rows**: at ≥40rem a 7.5rem date column, a flexible title and an auto kind column, baseline-aligned; below 40rem date and kind share a line with the title beneath. 0.45rem vertical padding, no rules between rows.
- **`history` rows**: a when column sized to the widest value (the list is a `max-content | 1fr` grid and rows use `subgrid`, so ranges like `2018–2026` fit and every sentence aligns), then the sentence; md gap, 0.45rem vertical padding.
- Prose rhythm: siblings 1.25em apart; `h2` 2.2em above, `h3` 2em, 0.75em after a heading; list items 0.2em apart, so a list reads as one group.

## Elevation & Depth

Flat. There are no shadows anywhere in the system. Depth and grouping come from hairline rules, the paper/ink contrast, and the one filled content surface in the world: dark code blocks. The block mark's dithered, one-cell offset shade belongs to the mark as ANSI block art; it is not a shadow and does not license offset shadows anywhere else. Sticky rails (post meta, archive years) are the only layering, and they carry no shadow.

### Named Rules
**The Hairline Rule.** Groups are separated by a single 1px `hairline` rule, never by a box, a fill or a shadow.

## Shapes

Square by default. Radius appears only on code (3px inline, 6px blocks), post images (4px) and the focus ring (2px). The block mark's cells, the swatches and the cursor are hard-edged rectangles. Borders are 1px hairlines on one side only (block-start, block-end, or the 1px pink inline-start rule on blockquotes); nothing is fully outlined.

## Components

### Links
- **Default:** `primary`, underlined with a 1px line offset 0.2em; colour transitions 0.15s ease.
- **Hover:** `primary-hover`.
- **Quiet links** (nav, list titles, pager): underline colour transparent at rest; on hover the underline appears in currentColor and ink turns pink.
- **Focus:** 2px solid `primary` outline, 3px offset, 2px radius, on every focusable element.

### Navigation
- **Header:** the current location as a shell path (`lib/site-path.tsx`): the pink `~/humont.dev` wordmark (links home), then each route segment after a muted `/`. Parent segments are muted links, and the current segment is ink with `aria-current="page"`. The path is mono at body size and never wraps; only the last segment shrinks, with an ellipsis. On the right are lowercase mono links `posts/` and `rss`, ink at rest and pink with underline on hover or when current (`aria-current`). A hairline closes the header.
- **Footer:** a hairline, then one mono label-size status line: a muted `© {year} Humont` on the left, and `rss` and `top` (to `#top` on the header) on the right, styled like the header nav.

### Prompt Line
A shell prompt in the `sheet` voice: pink `hugo@humont.dev`, muted ` ~ $`, then the command in `ink`. Within a page the user@host may be dropped to a bare muted `$` plus the command. Prompt lines head blocks of command output and serve as their `h2`; the decorative closing prompt is `aria-hidden`.

### Block Mark
A block-letter H drawn as CSS cells from a string map (11 columns by 9 rows, crossbar on the middle row; `█` is a filled cell, space is empty). The same map renders twice as two grid layers stacked in one grid area:
- **Shade layer** (below): the H offset by one cell width right and one cell width down (`translate: var(--cell) var(--cell)`), equal offsets on both axes because cells are 1.75× taller than wide. Its cells carry the dither: a `repeating-conic-gradient` of `ink-faint` and transparent at 4px × 4px.
- **Ink layer** (above, `position: relative` so it paints over the shade): the same H with solid `primary` cells.

The container pads one cell on the right and bottom so the shade is not clipped. The mark is `aria-hidden` and never depends on font glyphs (see the Glyph-Free Mark Rule). The dithered offset is the ANSI block-art shade of this one mark; it is not a shadow vocabulary for other elements.

### Fetch Spec Sheet
The neofetch-style sheet. A title in `title` size: the user name pink at 600, `@host` muted, closed by a hairline. Then a definition list of rows: pink 600-weight mono keys in a fixed column, `ink` mono values with `text-wrap: pretty`, and muted asides introduced by a middle dot (` · UK`, ` · latest 5 Oct 2026`). Keys are short nouns; values are facts and real counts.

### Palette Swatch Strip
Eight flush 2.25rem × 1.1rem rectangles under the sheet, in token order: `ink`, `ink-muted`, `ink-faint`, `hairline`, `primary`, `primary-hover`, `selection`, `code-slate`. `aria-hidden`; no labels, no gaps, no radius.

### `ls` Listing
Recent posts as command output. A mono muted date (2-digit day, short month, year: `05 Oct 2026`), the post title in sans `list-title` (ink, pink with underline on hover), and the kind (`note` category or `link`) in muted mono. Followed by a `cd posts/` link and a muted count aside.

### `history` Listing
An ordered list, newest first, with no visible numbering: a pink mono when-value, and the entry as a sans sentence at 1.5 line height.

### Cursor
A pink block (0.6em × 1.15em) that blinks with a stepped animation (1.1s, `steps(1)`, off at 50%); no fade. Under `prefers-reduced-motion: reduce` it stays solid. One per page, at the end of the closing prompt.

### Archive Listing
- **Year block:** an `h2` prompt, `$ ls -lt posts/{year}-*`, with the year pink 600 and tabular, then a muted `total N`. A year with no posts keeps its prompt and answers with a muted `zsh: no matches found: posts/{year}-*` (`aria-hidden`), so gaps in the archive stay visible.
- **Row:** muted mode (`-rw-r--r--` for a note, `lrwxr-xr-x` for a link) and size, the muted short date (`6 Oct`), the kind tag, then the title in sans `list-title` over a `label-sm` mono meta line: a pink `-> host` for a link, then each category with its emoji. Every row closes with a 1px dotted `hairline`. The whole row is the link's hit area. On hover (only on devices that can hover, so a tap never leaves it stuck) or keyboard focus the row takes a 7% pink wash (`color-mix` of `primary` into transparent) and the title turns pink; focus also draws the 2px pink ring. At ≥40rem rows are padded 0.6rem inline and pulled out by the same amount so the wash has room, and the ring sits inset. Below 40rem rows sit flush with the text column so the dotted dividers align with the content, and the ring sits 3px outside the row.
- **Filter:** `--all`, `--notes`, `--links`, each with a muted count, as visually hidden radios in a fieldset; muted at rest, `ink` on hover, pink with underline when checked. It works without JavaScript: the checked radio hides the other kind's rows and the years left empty, appends `| grep note` or `| grep link` to every prompt, and swaps each `total`.

### Post Header
A prompt line (`$ less posts/{slug}.mdx`) above the headline. The command is kept together: it wraps to its own line after `$` rather than splitting the filename, and breaks inside only when it alone exceeds the line. On a link post, a plain mono `label` line follows the title: pink 600 `link →`, the pink 600 host, then the muted path, which wraps only after a `/`. No box, rule or fill; the pink label carries the emphasis.

### Post Meta Rail
Set as front matter: a mono `label` definition list opened and closed by muted `---` lines. Muted terms with a trailing colon (`kind:`, `date:`, `read:`, `topics:`) in a `max-content` column, `ink` values. `kind` is the bracketed kind tag; `topics` is a YAML-style list under its key, each item a muted `- `, the category emoji and the lowercase name. At ≥60rem, where scroll-driven animation is supported, an `at:` row shows reading progress as a tabular percentage; it is `aria-hidden`.

### Section Anchors
Each `h2` and `h3` in a post opens with a muted `##` or `###` link to its own id; pink on hover or when the section is the `:target`. At ≥60rem the marks hang outside the measure. They are a pointer convenience: `aria-hidden` and out of the tab order, so heading names read cleanly.

### Code
- **Block:** `code-slate` fill, `code-ink` text, 6px radius, 1rem padding, horizontal scroll, 0.875rem at 1.6 line height; a `label-sm` (0.75rem) mono language tag in `code-ink-muted` top-left when a language is set.
- **Inline:** same slate fill, 0.875em, 0.3em side padding, 3px radius.
- **Ligatures off.** All code sets `font-variant-ligatures: none`, so `=>`, `!==` and `->` show the characters the reader would type, not JetBrains Mono's joined glyphs.

### Post Ending
After the body, an `(END)` marker (`ink` block, `paper` text, `aria-hidden`), then a hairline and, in order:
- On a link post, a pink 600 mono "Read the original on {host} ↗".
- A muted sans canonical line ("This note lives at") over the permalink: the mono `humont.dev/posts/…` link plus a muted `copy` button that confirms with a check and "copied" for 2s (selection-pink flash on the URL), announces through a polite live region, and explains itself if the clipboard is unavailable. The button's hit area extends 0.6rem above and below without moving the layout.
- Optional "Also posted to" syndication hosts, mono, inline.
- A pager under a hairline: one row per neighbour, `newer` first, as a subgrid of muted mono direction, mono date, sans `list-title` title and kind tag. Below 40rem the title drops beneath its direction, date and kind.
- A closing prompt, `cd posts/`, with the cursor.

## Do's and Don'ts

### Do:
- **Do** set every heading, date, count and label in JetBrains Mono, and all reading text in the system sans.
- **Do** declare new colours once on `:root` as `light-dark()` OKLCH pairs.
- **Do** separate groups with a single 1px `hairline` rule on one edge.
- **Do** give every dated item a mono, tabular, `ink-muted` date, aligned in a 4.5rem column for lists.
- **Do** keep reading text at or under the 40rem measure; use the 13rem left rail for post metadata at wide sizes.
- **Do** keep category emoji beside category names; they are an owner decision, marked `aria-hidden`.
- **Do** keep pink for links, a few emphasised phrases per passage, and the terminal's pink parts (prompt user, spec keys, when-values).
- **Do** use terminal forms in the frame (prompt lines, command output, key-value sheets), and keep sentences inside them in the sans.
- **Do** draw block art as CSS cells, `aria-hidden`; stop any blinking under reduced motion.

### Don't:
- **Don't** put content in cards, boxed panels or tag chips; the dark code block is the only filled content surface.
- **Don't** add shadows.
- **Don't** bold headings; hierarchy is size and the mono/sans switch at weight 400. The 600 weight belongs to spec-sheet keys and the fetch title's user name only.
- **Don't** set long-form reading text in mono, even inside a terminal form.
- **Don't** set box-drawing or block characters as text; the font subset does not carry them.
- **Don't** use pink as a background fill or for decorative blocks, beyond the block mark's cells, the cursor and the pink swatches.
- **Don't** use `ink-faint` for text; it fails contrast.
- **Don't** introduce a second accent hue outside syntax highlighting.
