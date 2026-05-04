# Spec: task-agent — BA Task → Specify-to-Implement Orchestrator

**Version:** 1.0
**Status:** approved

## Overview

`/task-agent <path>` accepts a BA-authored Markdown file and drives it through the full Rin Kit pipeline — BA Parse → Specify → Plan → Implement — with human approval gates between each stage. It is a thin orchestrator that delegates to existing Rin Kit skills rather than reimplementing their logic.

## Inputs

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `<path>` | relative file path | yes | Path to the BA `.md` file (e.g. `ba-tasks/reset-password.md`) |
| `--resume` | flag | no | Skip parsing, resume from last saved stage in `.rin-agent-state.json` |

## Outputs

| Artifact | Path | Produced at |
|---|---|---|
| Rin spec | `specs/<feature>.md` | Gate 1 |
| Implementation plan | `plans/<feature>-plan.md` | Gate 2 |
| Task queue | `tasks/tasks.json` | Gate 2 |
| Orchestrator state | `.rin-agent-state.json` | All stages (gitignored) |

## Behavior

### Stage 1 — BA Parse
1. Read the file at `<path>`.
2. Extract: feature title, user stories, acceptance criteria, constraints, edge cases, input/output fields.
3. Map extracted content to Rin spec sections using this table:

| BA pattern | Spec section |
|---|---|
| Title / h1 heading | Feature name |
| "As a user…" | `## Behavior` |
| Acceptance criteria / Given-When-Then | `## Behavior` + `## Outputs` |
| "Must", "Must not", "Constraint" | `## Constraints` |
| "Error", "Edge case", "If X fails" | `## Error Cases` |
| Input fields / parameters | `## Inputs` |
| Expected response / return value | `## Outputs` |

4. Any content that cannot be mapped is written to `## Open Questions` in the spec draft.
5. Run `spec-lint` on the draft. Auto-fix minor issues (missing fields, formatting). Surface blockers as Open Questions rather than failing.
6. Write the draft to `specs/<feature>.md`.

### Gate 1 — Spec Approval
Present:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GATE 1 — Spec ready for review
  File: specs/<feature>.md
  Open questions: <N>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
yes   → continue to planning
fix   → describe change, agent revises and re-presents
stop  → save state, exit
```

On `fix`: revise spec, re-run spec-lint, re-present Gate 1.
On `yes`: set `stage: "planning"` in state file, proceed to Stage 2.
On `stop`: write state, exit cleanly.

### Stage 2 — Plan
1. Call `spec-to-plan` on `specs/<feature>.md`.
2. Write `plans/<feature>-plan.md` and `tasks/tasks.json`.

### Gate 2 — Plan Approval
Same gate pattern as Gate 1.
On `fix`: revise the plan and tasks.json, re-present.
On `yes`: set `stage: "implementing"`, `current_task: 1` in state file.

### Stage 3 — Implement (loop)
For each pending task in `tasks/tasks.json`:
1. Call `task-next` to implement the task.
2. Call `validate-output` against the spec.
3. Call `task-done` to mark it complete.
4. Present Gate 3.

### Gate 3 — Per-Task Approval
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GATE 3 — Task <N> complete
  Task: <title>
  Validation: PASS / WARN / FAIL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
yes   → continue to next task
fix   → describe change, agent revises and re-validates
stop  → save state, exit
```

On `FAIL` from validate-output: do not present `yes` — show failure details, require `fix` or `stop`.

### Stage 4 — Final Validation
After all tasks complete:
1. Run `validate-output` across the full implementation.
2. Print pass/fail summary.
3. If all pass: suggest `/generate-pr`.
4. Delete `.rin-agent-state.json`.

### Resume
`/task-agent --resume`:
1. Read `.rin-agent-state.json`.
2. Print current stage and resume from there.
3. If state file missing: error — "No active session. Run `/task-agent <path>` to start."

## Constraints

- The orchestrator must not implement code itself — it delegates to existing skills.
- `spec-lint` must pass (no blockers) before Gate 1 is presented.
- Gate 3 must not offer `yes` if `validate-output` returns `FAIL`.
- `.rin-agent-state.json` must be gitignored.
- The `ba-tasks/` directory is the conventional location for BA files but is not enforced — any valid path is accepted.

## Error Cases

| Condition | Expected Behavior |
|---|---|
| `<path>` file not found | Error: "File not found: `<path>`. Provide a valid relative path." |
| BA file is empty | Error: "BA file is empty. Add requirements before running /task-agent." |
| spec-lint returns blockers | Surface as Open Questions, do not fail — present Gate 1 with note |
| `--resume` with no state file | Error: "No active session. Run `/task-agent <path>` to start." |
| validate-output returns FAIL at Gate 3 | Block `yes`, show failure details, require `fix` or `stop` |
| tasks.json already exists with pending tasks | Warn: "Existing tasks found. Overwrite? (yes/stop)" |

## Open Questions

_(none)_
