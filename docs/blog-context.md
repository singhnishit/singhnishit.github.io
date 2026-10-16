# Optional logo notes for blog posts

Edit the YAML header at the top of a post in `src/content/blog/`. The Decision Theory post already contains a working example. No component or page edits are needed for each new note.

## Copy this into a post's header

```yaml
context:
  logos: [lossfunk, redwood, mats]
  text: >-
    Work done as part of the application process for
    [Redwood Research](https://www.redwoodresearch.org/) and
    [MATS 12.0 (Winter)](https://www.matsprogram.org/)
    while at [Lossfunk](https://lossfunk.com/).
```

Keep this block inside the opening `---` delimiters, alongside `title`, `date`, and the other post settings. Indentation matters: use spaces, as shown. `>-` joins the following lines into one paragraph. Use `|` instead for multiple paragraphs separated by blank lines. The text supports ordinary Markdown, including links, emphasis, and lists.

## Choose the logos

The available names are `lossfunk`, `redwood`, and `mats`. Their order in the list is their display order. Use any subset:

```yaml
context:
  logos: [lossfunk]
  text: "Written while at [Lossfunk](https://lossfunk.com/)."
```

```yaml
context:
  logos: [redwood, mats]
  text: "Your own explanation goes here."
```

Omit `logos` (or use `logos: []`) for a text-only note. Remove the entire `context` block to remove the note. The note appears only on the individual article, not on homepage cards or in the expanded pinned article on the blog index.

## Add a different logo

Put the image in `public/assets/logos/`. SVG is ideal, but PNG, JPG, and WebP also work. Add a custom entry directly in the post:

```yaml
context:
  logos:
    - lossfunk
    - src: "/assets/logos/my-organisation.svg"
      alt: "My organisation"
      href: "https://example.com/"
      wide: false
  text: "Your **editable note**, with [a link](https://example.com/)."
```

`alt` is required and names the organisation for screen readers. `href` is optional; omit it for a logo without a link. `wide: true` spans both columns for a wordmark; omit it or use `false` for a square symbol. Logo links open normally in the same tab. The text and logo links can be edited independently.

To reuse a new logo by a short name across many posts, add it to `src/data/blog-logos.ts`. The schema picks up the names automatically.

## Layout and preview

On screens wider than 1320px, the compact note sits in the left margin, outside the article border. On narrower screens it appears at the end of the article, before the coloured divider and back link, keeping all text and links available. It scrolls naturally with the page. Wordmarks use a 136px-wide tile; square marks share a row. Existing posts without `context` keep their layout.

Run `Preview.command`, open the article, and check both a wide and narrow window. Run `Check Build.command` before publishing. Invalid logo names or malformed fields produce a build error instead of silently showing a broken note.

The default logo assets are in `public/assets/logos/`. Replace `lossfunk.svg` there with your own SVG to change it everywhere it is used; keep the filename the same. See `docs/logo-sources.md` for where the initial assets came from.

## AI-use disclosure icons (right margin)

Add this separate block inside a post's YAML header:

```yaml
aiDisclosure:
  - icon: fingerprint
    text: "Replace this with your disclosure for the fingerprint icon."
  - icon: seven-finger-hand
    text: "Replace this with your disclosure for the seven-finger hand."
```

Write the actual disclosure for each icon in `text`; the icon itself does not imply any particular claim about authorship or AI use. The Decision Theory post contains a working example with author-provided disclosures. Replace the example messages above with your own wording before publishing.

Use either icon, both, or omit `aiDisclosure` entirely. These messages are plain text; use YAML `>-` to write one paragraph across multiple source lines, or `|` to preserve line breaks. The assets are `public/assets/fingerprint.png` and `public/assets/seven-finger-hand.svg`.

The 65.5px tiles and 12px disclosure text match the logo note. On wide screens they align with the right-hand sidenotes, level with the left logo note. On narrower screens they appear at the end of the article. Hover or focus an icon to reveal its message; click/tap to keep it open, click/tap again or outside to close, or press Escape. Only one message is shown at a time. Disclosures are included as visible text when printing.
