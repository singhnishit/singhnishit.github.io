#!/bin/bash
cd "$(dirname "$0")"
bash scripts/website.sh update
read -r -p "Press Return to close..."
