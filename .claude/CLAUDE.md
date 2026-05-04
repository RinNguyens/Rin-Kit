# Rin AI Agent Kit

## Workflow Rules

1. **Spec is authority.** Never implement anything not in the spec. If requirements are unclear, update the spec first.
2. **One task at a time.** The Coder Agent takes one task, implements it, validates it, then moves on.
3. **Validate before proceeding.** Run `/validate-output` after every implementation task.
4. **No spec = no code.** If there is no spec file, run `/write-spec` before anything else.
5. **Lint before planning.** Run `/spec-lint` on every new spec before `/spec-to-plan`.

## Directory Conventions

- `specs/` — formal specifications. One file per feature. `specs/archive/` for retired specs.
- `plans/` — generated plans. Named `<feature>-plan.md`.
- `tasks/tasks.json` — single task queue for all active work.
- `docs/post-mortems/` — post-mortem files named `<date>-<slug>.md`.
- `.rin-context.md` — ephemeral context pack for sub-agents (gitignored).
- `.rin-checkpoint.md` — session checkpoint (gitignored).
- `handoff.md` — handoff document (gitignored).

## Agent Roles

| Role | Commands |
|------|----------|
| **Architect Agent** | `/write-spec`, `/spec-lint`, `/spec-split`, `/spec-merge`, `/import-spec`, `/retrofit-spec`, `/spec-update` |
| **Planner Agent** | `/spec-to-plan`, `/plan-fix`, `/explain-task` |
| **Coder Agent** | `/task-next`, `/task-done`, `/scaffold`, `/fix-bug`, `/fix-flow`, `/rollback-task` |
| **Test Agent** | `/write-tests`, `/test-coverage-check`, `/edge-case-hunt` |
| **Spec Guardian** | `/validate-output`, `/spec-diff`, `/review-patch`, `/impact-analysis` |
| **Ops Agent** | `/progress-report`, `/changelog`, `/dead-code`, `/post-mortem`, `/pre-commit`, `/generate-pr` |
| **Coordination** | `/context-pack`, `/parallel-tasks`, `/checkpoint`, `/handoff`, `/agent-spawn` |
| **Kit Management** | `/rin-init`, `/rin-upgrade` |

## Tasks JSON Schema

```json
{
  "spec": "specs/<name>.md",
  "tasks": [
    {
      "id": 1,
      "title": "string",
      "status": "pending | in_progress | done | needs-review | blocked",
      "depends_on": [],
      "completed_at": "ISO date or null"
    }
  ]
}
```

## Spec File Schema

```markdown
# Spec: <Feature Name>
**Version:** 1.0
**Status:** draft | approved | imported | deprecated

## Overview
## Inputs
## Outputs
## Behavior
## Constraints
## Error Cases
## Open Questions
```
