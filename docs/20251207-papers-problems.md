# Papers Sync Refactoring: Discovered Problems

Date: 2025-12-07

This document logs problems discovered during the papers sync refactoring.

---

## Status Summary

| # | Problem | Status |
|---|---------|--------|
| 1 | CLAUDE.md Lacks Project Identity | ✅ Resolved |
| 2 | CLAUDE.md Contains Code-Derivable Information | ✅ Resolved |
| 3 | Decision Policies Not in .work/FAQ/decisions | ⏸️ Deferred |
| 4 | Research Tools Lack CLI Entrypoints | ✅ Resolved |
| 5 | /research-daily Integration Unclear | ✅ Resolved |
| 6 | Removed README Auto-Update but No Replacement | ✅ Resolved |
| 7 | YYYYMMDD File Responsibility Unclear | ✅ Resolved |

---

## Decisions Made

### D1: Project Identity

**Decision**: agentic-blog is a business collaboration between Mechanica, Inc. and StoryHub, not a personal blog.

**Rationale**: Understanding the business context prevents LLM from treating this as a hobby project and over-documenting implementation details.

### D2: Documentation Principle

**Decision**: "Workspace status is the only current truth."

**Rationale**:
- This is a content-driven project; code is infrastructure
- `docs/*/README.md` represents current state
- Code details should be grepped, not documented

### D3: CLAUDE.md Content Policy

**Decision**: CLAUDE.md contains ONLY:
- Policies that override default LLM behavior
- Conventions not inferable from code
- External business context

**Anti-pattern**: Documenting file paths, function signatures, directory trees with specific names (e.g., `papers/`, `huggingface/`).

### D4: Directory Abstraction Level

**Decision**: `tools/` and `docs/` as concepts are important. Subdirectories below them are implementation details.

**Example**:
- ✅ "`tools/` - TypeScript utilities invoked from prompts"
- ❌ "`tools/lib/huggingface/daily-papers.ts` - Hugging Face API client"

### D5: Quality Gates as Framework

**Decision**: `check/lint/format/test` are documented as a quality framework, not as specific commands.

**Rationale**: These entrypoints may expand (e.g., workspace validation). The framework matters; implementation details don't.

### D6: Git Policy

**Decision**: Always commit. Don't ask.

**Rationale**: Revert and bisect exist. Time spent asking "should I commit?" is wasted.

### D7: Papers Sync Invocation

**Decision**: `npx tsx tools/papers/sync.ts` - direct execution, no package.json scripts.

**Rationale**: package.json scripts are a limited resource. Simple tools don't need them.

### D8: Tool Output File Naming

**Decision**: Tool outputs go to `docs/papers/YYYYMMDD-update.md` (flat structure, no subdirectories).

**Rationale**:
- `daily/` subdirectory was unnecessary complexity
- `-update` suffix distinguishes from LLM-authored files
- LLM may add insights in separate files or directly in README.md

### D9: File Growth Over Time

**Decision**: Prefer solutions that stay removable. Added to CLAUDE.md.

**Key points**:
- Hard to clean up: entries in shared config files, undated files
- Easier to clean up: code within feature directories, dated files
- This is why `package.json` scripts were avoided for papers sync

### D10: No Special Cases in Command Files

**Decision**: Workspace-specific behavior belongs in workspace README, not in command files.

**Example**:
- ❌ Special case in `/research-daily`: "if docs/papers, run sync tool"
- ✅ Contract field in workspace: `**Sync**: command → output`

**Rationale**: Command files are shared resources. Special cases accumulate over time. Each workspace should control its own behavior.

---

## Resolved Problems

### 1. CLAUDE.md Lacks Project Identity ✅

**Solution**: Added Project Identity section explaining:
- Business collaboration (Mechanica × StoryHub)
- Content-driven nature (research byproduct)
- Long-term timeline

### 2. CLAUDE.md Contains Code-Derivable Information ✅

**Solution**:
- Removed tools/ directory tree and file listings
- Removed specific file paths and function examples
- Replaced with abstract descriptions (role only)
- Added Quality Gates as framework, not command reference

### 4. Research Tools Lack CLI Entrypoints ✅

**Solution**:
- Added CLI entrypoint to `tools/papers/sync.ts`
- Can now run directly: `npx tsx tools/papers/sync.ts`
- Outputs to `docs/papers/YYYYMMDD-update.md`

### 7. YYYYMMDD File Responsibility Unclear ✅

**Solution**:
- Tool outputs: `docs/papers/YYYYMMDD-update.md` (auto-generated)
- LLM insights: README.md updates or separate dated files at LLM's discretion
- Removed `daily/` subdirectory - flat structure is simpler

---

## Deferred Problems

### 3. Decision Policies Not in .work/FAQ/decisions ⏸️

**Status**: Deferred - separate concern from papers sync refactoring.

**Note**: Policies remain in CLAUDE.md for now. Migration to `.work/FAQ/decisions/` is a future cleanup task.

### 5. /research-daily Integration Unclear ✅

**Solution**: Added `**Sync**` field to workspace contract (`docs/research/daily/README.md`).

Each workspace specifies its own sync command (if any) in its Daily Research section:
```
- **Sync**: `npx tsx tools/papers/sync.ts` → `docs/papers/YYYYMMDD-update.md`
```

No special cases in command files - each workspace controls its own research method.

### 6. Removed README Auto-Update but No Replacement ✅

**Solution**: README.md updates are handled by `/research-daily`'s existing UPDATE phase.

- Tool generates structured data (`YYYYMMDD-update.md`)
- LLM reads this during RESEARCH phase
- LLM updates README.md during UPDATE phase with curation and judgment
- No separate mechanism needed - fits within existing workflow

---

## All Problems Resolved

| Status | Count |
|--------|-------|
| ✅ Resolved | 6 |
| ⏸️ Deferred | 1 |

The papers sync refactoring is complete. Only Problem 3 (decision policies migration) remains deferred as a separate future task.
