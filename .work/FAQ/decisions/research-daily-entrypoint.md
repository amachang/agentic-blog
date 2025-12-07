# Decision: research-daily as Single Daily Research Entry Point

## Date
2025-12-07

## Decision
`/research-daily` is THE command for all daily research activities. Do not create parallel commands like `/research-papers`, `/research-news`, etc.

## Context
When considering how to add paper research to daily monitoring, there was confusion about whether to create a new `/research-papers` command. This revealed that the role of `research-daily` was not explicitly documented.

## Rationale
- **Unified workflow**: The 7-step process (SCAN → ALIGN → CHECK PRIOR RUNS → RESEARCH → UPDATE → LOG RUN → REPORT) applies to any daily monitoring task
- **Single briefing point**: One summary file per day (YYYYMMDD-summary.md) for all daily research
- **Flexible targets**: Template supports any research type via "Look for" and "Last known" fields
- **Avoids fragmentation**: Multiple commands would duplicate infrastructure and split briefings

## Alternatives Considered
1. **Separate commands per research type** (`/research-papers`, `/research-news`) → Rejected: unnecessary complexity, fragmented briefings
2. **Generic `/research` with parameters** → Rejected: daily cadence is special and deserves its own workflow

## Consequences
- New daily research targets are added to `docs/research/daily/README.md`, not as new commands
- The template in research-daily.md must remain generic (avoid version-specific language)
- Non-daily research methods (weekly analysis, ad-hoc deep dives) should get separate commands

## Related
- `.claude/commands/research-daily.md` - The command definition
- `docs/research/daily/README.md` - Target registry
- `docs/research/README.md` - Research methods overview
