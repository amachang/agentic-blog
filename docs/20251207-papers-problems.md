# Papers Sync Refactoring: Discovered Problems

Date: 2025-12-07

This document logs problems discovered during the papers sync refactoring. These are observations, not solutions.

---

## 1. CLAUDE.md Lacks Project Identity

**Problem**: The CLAUDE.md file does not explain what this project is.

- Jumps straight into implementation details (directories, commands)
- No business context or purpose statement
- A new reader arriving at the codebase has no idea what "agentic-blog" does
- Assumes familiarity that does not exist

---

## 2. CLAUDE.md Contains Code-Derivable Information

**Problem**: CLAUDE.md documents things that can be discovered from the code itself.

Examples of redundant documentation:
- Specific file paths (findable via grep/glob)
- Function names and usage examples
- Template file listings with full directory trees
- Build commands that exist in package.json

**Consequences**:
- Information becomes stale as code evolves
- Maintenance burden to keep docs and code in sync
- Contradictions when updates are missed

---

## 3. Decision Policies Not in .work/FAQ/decisions

**Problem**: Policy decisions are scattered in CLAUDE.md instead of the designated location.

Policies that should be in `.work/FAQ/decisions/`:
- "docs/ Language Policy" (English only requirement)
- "Token Efficiency" principles
- docs/ structure conventions

**Consequence**: Decision rationale is mixed with operational instructions, making both harder to find and maintain.

---

## 4. Research Tools Lack CLI Entrypoints

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

## 5. /research-daily Integration Unclear

**Problem**: Design mismatch between general research command and tool-based research.

Observations:
- `/research-daily` uses WebFetch/WebSearch for general research
- `docs/papers/` workspace needs `syncDailyPapers()` for structured data
- `docs/papers/README.md` says "Check: via syncDailyPapers()" but provides no clear invocation path
- Two different research paradigms (LLM browsing vs. API tools) are not integrated

**Question**: How should tool-based research (papers API) integrate with LLM-driven research (/research-daily)?

---

## 6. Removed README Auto-Update but No Replacement

**Problem**: `syncDailyPapers()` no longer updates `docs/papers/README.md`, but the workflow is undefined.

Context:
- Auto-update was removed to give LLM discretion over README content
- This is philosophically correct (LLM should curate, not just append)
- But now "Last sync" status has no update mechanism
- README.md "Current state" section has no defined maintainer

**Question**: Who/what updates the README.md now? When? Based on what trigger?

---

## 7. YYYYMMDD File Responsibility Unclear

**Problem**: Multiple actors may create dated files in docs/papers/, with unclear boundaries.

Current situation:
- `syncDailyPapers()` writes to `docs/papers/daily/YYYYMMDD-summary.md`
- Daily research workflow might create `docs/papers/YYYYMMDD-daily-update.md`
- Both are valid per docs/ structure conventions
- Overlap and confusion about who owns what

**Questions**:
- Is `daily/` subdirectory the right location for tool output?
- Should LLM notes go in parent `docs/papers/` or somewhere else?
- How do tool outputs and LLM observations merge?

---

## Summary

These problems cluster around two themes:

1. **Documentation debt**: CLAUDE.md needs restructuring (identity, code-derivable info, policy location)
2. **Tool integration gap**: Research tools exist but lack clear invocation paths and workflow integration

Both require design decisions before implementation.
