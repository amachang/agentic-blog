# Decision: Preventing File Accumulation in Long-Term Projects

## Date
2025-12-07

## Decision
Prefer removable solutions over shared-resource entries. Delegate implementation details to workspaces rather than centralizing in contracts.

## Context
During papers sync refactoring, we identified a recurring pattern: shared resources (CLAUDE.md, package.json, command contracts) accumulate entries over time and become hard to clean up.

## The Pattern

### 1. Documentation Bloat
**Anti-pattern**: CLAUDE.md documents file paths, function signatures, directory trees
```
❌ "tools/lib/huggingface/daily-papers.ts - Hugging Face API client"
✅ "tools/ - TypeScript utilities invoked from prompts"
```
**Test**: "Could grep find this?" If yes, don't document it.

### 2. Config File Bloat
**Anti-pattern**: Adding package.json scripts for every small tool
```
❌ "papers-sync": "tsx tools/papers/sync.ts"
✅ npx tsx tools/papers/sync.ts (direct invocation)
```
**Principle**: package.json scripts are a limited resource. Simple tools don't need them.

### 3. Contract Bloat
**Anti-pattern**: Commands/contracts that specify structure
```
❌ Contract: "Workspace must have Check, Sync, Look for, Last known fields"
✅ Contract: "See workspace for details"
```
**Evolution**: When contracts assume structure, adding alternatives feels like exceptions. Full delegation eliminates accumulation.

## Why Shared Resources Accumulate

| Resource Type | Accumulation Risk | Cleanup Difficulty |
|---------------|-------------------|-------------------|
| Entries in shared configs | High | Hard (who knows what's used?) |
| Undated files | High | Hard (no staleness signal) |
| Code in feature directory | Low | Easy (delete the directory) |
| Dated files (YYYYMMDD-*) | Low | Easy (old = obviously old) |

## Rationale
Every line in a shared config is a future maintenance question. Every field in a contract is a constraint on alternatives. Prefer solutions that can be deleted without auditing dependencies.

## Consequences
- New tools: Use direct `npx tsx` invocation unless frequently called
- New research targets: Define method in workspace README, not in command
- New documentation: Ask "will this be stale next month?"

## Related
- `.work/FAQ/decisions/research-daily-entrypoint.md` - Single command, multiple targets
- `CLAUDE.md` - Documentation vs derivable information principle
