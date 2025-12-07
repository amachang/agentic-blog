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

All directories under `docs/` are workspaces:

- **README.md** (required): Current state - what's happening now
- **YYYYMMDD-*.md** (optional): Historical records, detailed notes
- **Sub-directories**: Nested workspaces with same pattern

**Usage principle**: README.md is the single source of truth for current state.

- **Exploring**: Always start with README.md before checking git status or individual files
- **Updating**: Update README.md first to reflect current state; escape details to dated files
