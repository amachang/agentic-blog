# Project Identity

**agentic-blog** - AI-driven technical media platform. A business collaboration between Mechanica, Inc. and StoryHub.

- **Content**: AI/orchestrator research, generated as byproduct of daily research work
- **Partnership**: StoryHub provides炎上チェック・SEO; 天野 provides content & tech
- **Timeline**: Long-term project evolving over months and years

## Documentation Principle

**Workspace status is the only current truth.**

This is a content-driven project. Code is infrastructure, not the point. What matters:
- `docs/*/README.md` - current state of each workspace
- Research progress, content pipeline, partnership status

Don't document code details here. Code changes; grep it when needed.

---

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

# tools/

TypeScript utilities invoked from prompts. Libraries, not CLI entrypoints.

# Git Policy

Commit always. Don't ask "should I commit?" - just commit. Revert and bisect exist for a reason.

# Quality Gates

These entrypoints define the project's quality framework:

- `npm run check` - Type checking
- `npm run lint` - Static analysis
- `npm run format` - Code formatting
- `npm run test` - Tests

Run before committing. May expand to include workspace validation.
