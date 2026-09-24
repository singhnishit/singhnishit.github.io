#!/bin/bash
cd "$(dirname "$0")"
bash scripts/website.sh preview
read -r -p "Press Return to close..."
