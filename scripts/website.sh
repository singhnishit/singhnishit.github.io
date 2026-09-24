#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

ensure_dependencies() {
  if ! command -v node >/dev/null || ! command -v npm >/dev/null; then
    echo "Install Node.js 22.12 or newer, then try again."
    exit 1
  fi
  if [[ ! -x node_modules/.bin/astro ]]; then
    npm ci --no-audit --no-fund
  fi
}

case "${1:-}" in
  preview)
    ensure_dependencies
    echo "Preview: http://localhost:4321 — save edits to see them update."
    echo "Press Control-C to stop the preview."
    npm run dev -- --host 127.0.0.1 --open
    ;;
  check)
    ensure_dependencies
    npm run build
    echo "Production build passed. Opening the built site for a visual check."
    npm run preview -- --host 127.0.0.1 --open
    ;;
  update)
    ensure_dependencies
    if [[ -n "$(git status --porcelain)" ]]; then
      echo "You have local changes. Publish or commit them before downloading updates."
      exit 1
    fi
    git pull --ff-only
    npm ci --no-audit --no-fund
    ;;
  publish)
    [[ "$(git branch --show-current)" == main ]] || { echo "Switch to main before publishing."; exit 1; }
    ensure_dependencies
    git fetch origin main
    git merge-base --is-ancestor origin/main HEAD || {
      echo "GitHub has changes missing locally. Commit your edits, merge origin/main, and preview again."
      exit 1
    }
    npm run build
    git diff --check
    git diff --cached --check
    echo
    echo "Files to publish (including any already staged changes):"
    git status --short -- . ':!node_modules' ':!dist' ':!.astro' ':!**/.DS_Store' ':!.DS_Store'
    cleanup_count=$(git diff --cached --name-only --diff-filter=D -- node_modules dist .astro '**/.DS_Store' .DS_Store | wc -l | tr -d ' ')
    if [[ "$cleanup_count" != 0 ]]; then
      echo "Also removing $cleanup_count generated/cache files from Git tracking (kept locally)."
    fi
    echo
    echo "Existing commits to publish:"
    git log --oneline origin/main..HEAD
    echo
    read -r -p "Have you checked the preview? Type PUBLISH to push these changes to the live site: " answer
    [[ "$answer" == PUBLISH ]] || { echo "Cancelled. Nothing was pushed."; exit 0; }
    if [[ -n "$(git status --porcelain)" ]]; then
      read -r -p "Describe your change: " message
      [[ -n "${message// /}" ]] || { echo "A description is required."; exit 1; }
      git add -A
      git commit -m "$message"
    fi
    git push origin HEAD:main
    echo "Pushed. GitHub will build and deploy your site."
    open "https://github.com/singhnishit/singhnishit.github.io/actions" || true
    ;;
  *) echo "Usage: bash scripts/website.sh {preview|check|update|publish}"; exit 1 ;;
esac
