# Daily Research Command

Perform daily research across all tracked workspaces, checking for updates and recording findings.

## Context

First, read `docs/research/README.md` for:
- Research concepts (Genre vs Specific Targets, Active vs Backlog)
- Available methods and their purposes
- Overall research strategy

## Research Targets

Read targets from `docs/research/daily/README.md`.

The targets are listed in the "Targets" section as workspace paths, each containing a README.md with research instructions in its "Daily Research" section.

## Workflow: SCAN -> ALIGN -> CHECK PRIOR RUNS -> RESEARCH -> UPDATE -> LOG RUN -> REPORT

### 1. SCAN

For each workspace in the target list:
- Read the workspace README.md
- Look for a "Daily Research" section

### 2. ALIGN

If a workspace README lacks a "Daily Research" section:
- Create one based on existing README content (repository URL, releases URL, etc.)
- Use this template:

```markdown
## Daily Research

- **Check**: [URL or source to check]
- **Look for**: [What to look for - updates, new items, changes, etc.]
- **Last known**: [Most recent state - version, date, or description]
```

**Examples:**
- Software version: `**Last known**: v2.0.60 (2025-12-06)`
- Paper tracking: `**Last known**: Checked 2025-12-05, 3 relevant papers found`
- News/trends: `**Last known**: RAG dominant, agent frameworks emerging (2025-12)`

### 3. CHECK PRIOR RUNS

Check if research was already run today by reading `docs/research/daily/YYYYMMDD-summary.md` (using today's date).

If the file exists:
- Parse the run sections to understand what was already checked
- Note the timestamp of the last run
- Track which updates were already found today
- If parsing fails or the file is malformed, treat as if no prior runs exist today

Store this context for use in the REPORT phase. This does NOT skip the RESEARCH phase - always perform fresh research.

### 4. RESEARCH

For each workspace:
- Follow the instructions in its "Daily Research" section
- These are GUIDES, not rigid rules - adapt to what you find
- Use WebFetch or WebSearch to check the specified sources
- Note any updates since the recorded version

**Special case: `docs/papers`**

This workspace has a dedicated sync tool. Before using WebFetch/WebSearch:

1. Run: `npx tsx tools/papers/sync.ts`
2. Read the generated `docs/papers/YYYYMMDD-update.md`
3. Use this as your primary data source
4. Add LLM insights via WebSearch if relevant (optional)

### 5. UPDATE

When updates are found:
- Update the workspace README.md with new version info
- Create a dated file (YYYYMMDD-*.md) if there are notable changes
- Keep updates concise and focused

### 6. LOG RUN

Create or append to `docs/research/daily/YYYYMMDD-summary.md` (using today's date).

Format for new file:
```markdown
# Daily Research Summary - YYYY-MM-DD

## Run 1: HH:MM

**Targets checked:** N workspaces
**Updates found:** N
**Errors:** N

### Updates
- target-name: vX.Y.Z released (changelog link)

### No Changes
- target-name: vX.Y.Z (current)

### Errors (if any)
- target-name: error description

---
```

For subsequent runs, append a new section:
```markdown
## Run N: HH:MM

**Targets checked:** N workspaces
**Updates found:** N
**Errors:** N

### Updates
- target-name: description of update

### No Changes
- target-name: version (current)

### Errors (if any)
- target-name: error description

---
```

### 7. REPORT

Final step: report to the user with TWO briefings.

**Today's Briefing** (all updates found today):
- Combine updates from prior runs today (from CHECK PRIOR RUNS) with this run's findings
- Shows the full picture of what changed today
- If this is the first run, this equals "Since Last Run"

**Since Last Run Briefing**:
- Only changes found in THIS run
- If no changes: "No new updates since last run at HH:MM"
- If changes: List what's new since the last run

Also include:
- List any workspaces where research instructions were added
- Note any issues encountered

## Error Handling

Parallel WebFetch requests may cause ETIMEDOUT errors due to concurrent connections. When this happens:

- Retry the failed request 2-3 times before giving up
- Consider using WebSearch as a fallback (often more reliable for GitHub pages)
- If a specific URL consistently fails, try an alternative source (e.g., npm page, docs site)

Don't let one failed fetch block the entire research process.

## Flexibility Clause

README instructions describe WHAT to check and WHERE, but not rigid HOW.

- If a releases page is empty, check the changelog instead
- If the main branch has unreleased changes, note them
- If you discover a better source, update the research instructions
- Adapt to repository structure changes

The goal is finding useful information, not following a script.

## Adding New Targets

To add a new research target:
1. Create the workspace directory under docs/
2. Add a README.md with basic info (name, repository, description)
3. Add the path to `docs/research/daily/README.md` Targets section
4. The ALIGN phase will create the Daily Research section if missing
