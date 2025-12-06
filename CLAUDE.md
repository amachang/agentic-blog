# Business Context (External Directories)

If `.claude/settings.local.json` exists in a project (gitignored, so user-dependent), it may contain `additionalDirectories` with useful business context such as:
- Client documentation
- Project specifications
- User Stories and requirements

Check this file when planning features or understanding user stories.

# Token Efficiency

Write frequently referenced documentation in English to minimize token usage.

# docs/ Language Policy

All documentation under `docs/` must be written in English. This ensures:
- Consistent token usage across the project
- Better compatibility with LLM processing
- Unified documentation style

# docs/ Structure

`docs/` is not a workspace, but all directories under `docs/` are workspaces with a consistent structure:

- **README.md** (required): Living document showing current state
- **YYYYMMDD-*.md** (optional): Historical records, decision logs, detailed notes
- **Sub-directories**: Nested workspaces following the same pattern

This structure prevents information explosion - README.md stays current, details escape to dated files.
