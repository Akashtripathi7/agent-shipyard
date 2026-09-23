#!/usr/bin/env bash
# Runs every check for this project. Exits non-zero if anything fails.
# The agent calls this, you call this, and CI calls this: "passing" means one thing everywhere.
# Adapt the commands to your stack; keep the single entry point.
set -euo pipefail

# Python backend
if [ -d .venv ]; then
  .venv/bin/ruff format --check .
  .venv/bin/ruff check .
  .venv/bin/pytest -q
fi

# Flutter app (uncomment when the project has one)
# (cd app && dart format --output=none --set-exit-if-changed . && flutter analyze && flutter test)
