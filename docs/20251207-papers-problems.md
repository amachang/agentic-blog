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
| 4 | Research Tools Lack CLI Entrypoints | ❌ Open |
| 5 | /research-daily Integration Unclear | ❌ Open |
| 6 | Removed README Auto-Update but No Replacement | ❌ Open |
| 7 | YYYYMMDD File Responsibility Unclear | ❌ Open |

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

---

## Deferred Problems

### 3. Decision Policies Not in .work/FAQ/decisions ⏸️

**Status**: Deferred - separate concern from papers sync refactoring.

**Note**: Policies remain in CLAUDE.md for now. Migration to `.work/FAQ/decisions/` is a future cleanup task.

---

## Open Problems

### 4. Research Tools Lack CLI Entrypoints

**Problem**: `syncDailyPapers()` is a library function with no direct invocation path.

Current state:
- Function exists in `tools/papers/sync.ts`
- Can only be called via awkward `npx tsx -e "import..."` syntax
- No proper CLI wrapper or script entrypoint

**Consequence**:
- `/research-daily` command cannot easily invoke the tool
- Manual invocation is error-prone and verbose
- Barrier to automation

---

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

### 7. YYYYMMDD File Responsibility Unclear

**Problem**: Multiple actors may create dated files in docs/papers/, with unclear boundaries.

Current situation:
- `syncDailyPapers()` writes to `docs/papers/daily/YYYYMMDD-summary.md`
- Daily research workflow might create `docs/papers/YYYYMMDD-daily-update.md`
- Overlap and confusion about who owns what

**Questions**:
- Is `daily/` subdirectory the right location for tool output?
- Should LLM notes go in parent `docs/papers/` or somewhere else?
- How do tool outputs and LLM observations merge?

---

## Next Steps

The remaining open problems (4-7) cluster around **tool integration**:
- How tools are invoked
- How tool output integrates with LLM workflow
- Who owns which files

These require design decisions before implementation.
