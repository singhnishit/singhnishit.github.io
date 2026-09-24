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
| Miscellaneous entries | `src/content/misc/*.md` |
| Blog listing and gallery | `src/pages/blog/index.astro`, `src/pages/gallery.astro` |
| Shared article layout | `src/layouts/Layout.astro` |
| Main stylesheet | `public/style.css` |
| Images and other assets | `public/` |

Do not edit `dist/`, `.astro/`, or `node_modules/`: these are generated. The original repository tracked them; this setup removes them from Git tracking while retaining local dependencies and build output on disk. The first publish includes that cleanup and these workflow files.

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
