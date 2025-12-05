
<how-to-find-work>
#### How to Find Current Work

A quick reference for understanding what you're working on in orchestrated projects.

##### Where to Look

###### 1. Current Sprint Tasks

```bash
cat .work/CURRENT_SPRINT.md
```

This file contains:

- Active phases and their tasks (checkbox format)
- Branch naming convention
- Sprint FAQ and context
- Links to related documentation

###### 2. Check Your Git Branch

```bash
git branch --show-current
```

Feature branches follow the pattern: `feature/<function>-phase<number>-<description>`

##### .work/ Directory Structure

```
.work/
├── CURRENT_SPRINT.md    # Living Document - sprint status
├── TODO/               # Workspace - implementation details
│   ├── README.md       # Status index (update obligation)
│   └── STEP-*.md       # Work records (no update obligation after completion)
├── ISSUES/
│   ├── open/           # Workspace - active issues
│   │   └── README.md   # Status index
│   └── closed/         # Archive Directory - resolved issues
├── FAQ/
│   ├── decisions/      # Living Documents - current policies
│   └── pitfalls/       # Living Documents - known issues
├── HISTORY/            # Archive Directory - sprint history
└── tmp/                # Temporary files (gitignored)
```

**Classification Key**: Living Document = must update on ripgrep match; Workspace = check README, skip individual files; Archive Directory = skip (history).

##### Task Workflow

1. **Find your task** in `.work/CURRENT_SPRINT.md`
2. **Create/switch to feature branch**: `git checkout -b feature/<function>-phase<N>-<description>`
3. **Work on the task**
4. **Update task status** in CURRENT_SPRINT.md
5. **Commit with clear message** referencing the task

##### Terminology

- **phase-init**: Planning workflow that creates `.work/TODO/` documentation before implementation
- **phase-todo**: `.work/TODO/` planning documents for the current phase

##### Common Patterns

- **Checkbox tasks**: `[x]` completed, `[ ]` pending
- **Phases**: Logical groupings of related work
- **Feature branches**: One per phase
- **TODO folder**: Appears in feature branches with implementation details

##### Quick Tips

- Keep only ONE task "IN PROGRESS" at a time
- Update .work/CURRENT_SPRINT.md as you work
- If confused, check git branch and recent commits
</how-to-find-work>

