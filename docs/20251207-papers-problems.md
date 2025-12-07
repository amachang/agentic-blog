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
| 5 | /research-daily Integration Unclear | ❌ Open |
| 6 | Removed README Auto-Update but No Replacement | ❌ Open |
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

---

## Open Problems

### 5. /research-daily Integration Unclear

**Problem**: Design mismatch between general research command and tool-based research.

Observations:
- `/research-daily` uses WebFetch/WebSearch for general research
- `docs/papers/` workspace needs `syncDailyPapers()` for structured data
- Two different research paradigms (LLM browsing vs. API tools) are not integrated

**Question**: How should tool-based research (papers API) integrate with LLM-driven research (/research-daily)?

---

### 6. Removed README Auto-Update but No Replacement

**Problem**: `syncDailyPapers()` no longer updates `docs/papers/README.md`, but the workflow is undefined.

Context:
- Auto-update was removed to give LLM discretion over README content
- This is philosophically correct (LLM should curate, not just append)
- But now "Last sync" status has no update mechanism

**Question**: Who/what updates the README.md now? When? Based on what trigger?

---

## Next Steps

The remaining open problems (5-6) are about **workflow integration**:
- How `/research-daily` should invoke the papers sync tool
- When and how README.md gets updated

These are workflow design questions, not implementation blockers.
