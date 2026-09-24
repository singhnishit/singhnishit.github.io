#!/bin/bash
cd "$(dirname "$0")"
bash scripts/website.sh publish
read -r -p "Press Return to close..."
