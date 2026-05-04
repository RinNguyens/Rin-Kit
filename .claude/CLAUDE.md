# Rin AI Agent Kit

## Workflow Rules

1. **Spec is authority.** Never implement anything not in the spec. If requirements are unclear, update the spec first.
2. **One task at a time.** The Coder Agent takes one task, implements it, validates it, then moves on.
3. **Validate before proceeding.** Run `/validate-output` after every implementation task.
4. **No spec = no code.** If there is no spec file, run `/write-spec` before anything else.

## Directory Conventions

- `specs/` — formal specifications. One file per feature.
- `plans/` — generated plans. Named `<feature>-plan.md`.
- `tasks/tasks.json` — single task queue for all active work.
- `.claude/commands/` — slash command definitions.

## Agent Roles

- **Architect Agent** → `/write-spec`
- **Planner Agent** → `/spec-to-plan`, `/plan-fix`
- **Coder Agent** → `/task-next`, `/scaffold`, `/fix-bug`, `/fix-flow`
- **Spec Guardian** → `/validate-output`, `/spec-diff`, `/review-patch`

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
