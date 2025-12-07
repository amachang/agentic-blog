# Daily Papers

Daily paper summaries fetched from Hugging Face Daily Papers API.

## Format

Each file follows the naming convention: `YYYYMMDD-summary.md`

Files contain:
- Paper title
- Authors (first 3 + et al.)
- Upvote count
- arXiv link
- Abstract

## Sync

Papers are synced via the `@tools/papers/sync` tool, sorted by upvotes descending.
