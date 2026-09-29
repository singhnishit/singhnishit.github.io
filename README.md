# Edit your website locally

This folder is a Git checkout of https://github.com/singhnishit/singhnishit.github.io on `main`.

## Everyday workflow

1. Open this folder in your preferred code editor (for example, VS Code).
2. Double-click **Preview.command**. Keep its Terminal window running while editing; saved changes appear automatically in the local browser preview.
3. Edit the files below. Check the homepage, blog, images, links, and a narrow/mobile browser window.
4. Double-click **Check Build.command** to build and preview the production output. Build success checks compilation; you still need to look at the pages.
5. Double-click **Publish.command** when ready. It checks GitHub for newer changes, builds, lists your changed files and outgoing commits, and asks you to type `PUBLISH` and describe the edit. It then commits and pushes to `main`.

GitHub Actions automatically deploys pushes to `main`. Follow progress at https://github.com/singhnishit/singhnishit.github.io/actions. The live site is https://singhnishit.github.io. Deployment takes a little time; a successful push is not the same as a completed deployment.

Press **Control-C** in a preview Terminal window to stop it. If port 4321 is busy, Astro prints the alternative port it uses.

## Where to edit

| Content | Location |
| --- | --- |
| Homepage and biography | `src/pages/index.astro` |
| Blog articles | `src/content/blog/*.md` |
| Projects | `src/content/projects/*.md` |
| Research | `src/content/research/*.md` |
| Talks | `src/content/talks/*.md` |
| Miscellaneous entries | `src/content/misc/*.md` |
| Blog listing and gallery | `src/pages/blog/index.astro`, `src/pages/gallery.astro` |
| Shared article layout | `src/layouts/Layout.astro` |
| Main stylesheet | `public/style.css` |
| Images and other assets | `public/` |

Do not edit `dist/`, `.astro/`, or `node_modules/`: these are generated. The original repository tracked them; this setup removes them from Git tracking while retaining local dependencies and build output on disk. The first publish includes that cleanup and these workflow files.

## Research links

Each research entry can contain any number of labelled links in its frontmatter:

```yaml
links:
  - label: "arxiv"
    url: "https://arxiv.org/abs/YOUR-PAPER-ID"
  - label: "conference"
    url: "https://your-conference.org/registration"
```

Replace the example URLs with the actual destinations. Existing `link` and `linkLabel` fields still work and appear before `links`, so you can keep your current arXiv link and add just the conference link. Alternatively, move both into `links` and remove the old fields to avoid repeating a link.

## Adding talks

PDF slides live in `public/assets/talks/slides/`. To link one, use its site-relative path, for example `url: "/assets/talks/slides/analogy.pdf"`. The same link works in the local preview and on the published site. Replace the PDF file to update a deck without changing its link.

Copy `src/content/talks/01-example.md` to a new `.md` file for each talk. Fill in the title, venue, and optional author, date, description, thumbnail, and links. Set `draft: false` to show the entry; drafts are hidden from both the preview and published site. Talks appear between research and projects. Until you add one, the section says “talks coming soon.”

```yaml
---
title: "Your talk title"
authors: "Nishit Singh"
venue: "Conference or event name"
date: "September 2026"
thumbnail: "/assets/thumbnails/your-talk.jpg"
order: 1
draft: false
links:
  - label: "slides"
    url: "https://example.com/your-slides"
  - label: "registration"
    url: "https://example.com/your-event"
---
```

- Talks use the same row layout as Research: a 180 × 100px thumbnail on the left and the title, venue, description, and links on the right. Images fit within the frame without cropping. On mobile, the image and text stack using the same responsive styling as Research.
- Smaller `order` values appear first; ties follow filename order. Dates are display text, so you can use a month, year, or full date.
- Talks use the same `links` list as research. A missing thumbnail gets a neutral placeholder. The Markdown body is not displayed on the homepage; use `description` for the short summary.

## Download changes made elsewhere

Double-click **Get Latest.command** before starting if you edited on another computer or GitHub. It requires a clean local checkout and only performs a fast-forward pull. If publishing reports newer GitHub changes, commit your local edits, merge `origin/main` using your editor's Git interface, resolve any conflicts, and preview again. The shortcuts never force-push.

## Terminal equivalents

Run these from this folder:

```sh
npm ci                     # install locked dependencies on a new machine
npm run dev                # preview with live updates
npm run build              # verify production compilation
npm run preview            # serve the last production build
bash scripts/website.sh publish
```

Requires Node.js 22.12 or newer and Git. Publishing uses your Mac's GitHub credentials through Git's macOS Keychain helper. If authentication is requested, use a GitHub personal access token with repository write access as the HTTPS password, or sign in using GitHub CLI (`gh auth login`, then `gh auth setup-git`). Never put a token in a source file or remote URL.

Publishing includes all non-ignored local changes. Review the file list first. Local `.env` files are ignored; keep private credentials out of website source and `public/`.
