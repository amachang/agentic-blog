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

## Workflow: SCAN -> ALIGN -> RESEARCH -> UPDATE -> REPORT

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

- **Check**: [URL to check - releases page, changelog, etc.]
- **Look for**: New versions, notable changes, deprecations
- **Current**: [version] ([date if known])
```

### 3. RESEARCH

For each workspace:
- Follow the instructions in its "Daily Research" section
- These are GUIDES, not rigid rules - adapt to what you find
- Use WebFetch or WebSearch to check the specified sources
- Note any updates since the recorded version

### 4. UPDATE

When updates are found:
- Update the workspace README.md with new version info
- Create a dated file (YYYYMMDD-*.md) if there are notable changes
- Keep updates concise and focused

### 5. REPORT

After processing all workspaces:
- Summarize findings (updates found, no changes, errors)
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
