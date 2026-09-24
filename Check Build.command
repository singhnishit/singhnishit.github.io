#!/bin/bash
cd "$(dirname "$0")"
bash scripts/website.sh check
read -r -p "Press Return to close..."
