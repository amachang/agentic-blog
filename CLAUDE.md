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

# tools/ Directory

TypeScript utilities for prompt-invoked operations. These are libraries, NOT CLI entrypoints.

## Structure

```
tools/
├── __tests__/     # Vitest test files (mirrors source structure)
├── lib/           # Shared libraries (API clients, utilities)
│   └── huggingface/
│       └── daily-papers.ts   # Hugging Face Daily Papers API client
├── papers/
│   └── sync.ts               # Paper sync tool
└── templates/     # Handlebars template files
    └── papers/
```

## Usage

Tools are imported and invoked from prompts:

```typescript
import { syncDailyPapers } from '@tools/papers/sync';
await syncDailyPapers({ minUpvotes: 10 });
```

For ad-hoc execution with tsx:

```bash
npx tsx -e "import { syncDailyPapers } from './tools/papers/sync.js'; await syncDailyPapers();"
```

## Build/Lint/Format

Unified scripts for src/ and tools/:

```bash
npm run check        # Astro check + TypeScript type check
npm run lint         # ESLint for src and tools
npm run format       # Prettier format
npm run format:check # Prettier check
```

## Testing

Tests use vitest and are located in `tools/__tests__/`:

```bash
npm run test         # Run all tests once
npm run test:watch   # Run tests in watch mode
```

Test file convention:
- Test files: `tools/__tests__/**/*.test.ts`
- Mirror the source structure: `tools/lib/foo.ts` -> `tools/__tests__/lib/foo.test.ts`

## Templates

Handlebars templates for markdown generation are in `tools/templates/`:

```
tools/templates/
└── papers/
    ├── summary.hbs       # Daily papers summary
    ├── paper-entry.hbs   # Single paper entry partial
    └── readme.hbs        # Papers workspace README
```
