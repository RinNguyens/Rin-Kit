# Rin AI Agent Kit

> **Specify-to-Implement** — The Spec is the single source of truth. No code is written until the logic is validated against the specification.

## Workflow

```
Specify → Plan → Tasks → Implement
    ↑                         |
    └─────── Spec Guardian ───┘
```

| Stage | Agent | Input | Output |
|-------|-------|-------|--------|
| **Specify** | Architect Agent | Requirements | Formal Spec (OpenAPI / Markdown) |
| **Plan** | Planner Agent | Spec | Ordered task list |
| **Tasks** | — | Plan | `tasks.json` / GitHub Issues |
| **Implement** | Coder Agent | Task + Spec | Validated code |

## Install

```bash
npx rin-kit init
```

Or manually copy `.claude/` into your project root.

## Slash Commands

| Command | Description |
|---------|-------------|
| `/write-spec` | Scaffold a formal spec (OpenAPI / Markdown template) |
| `/spec-to-plan` | Parse spec → ordered task list |
| `/plan-fix` | Identify gaps or conflicts in the plan |
| `/review-patch` | Review a diff against the spec |
| `/fix-bug` | Debug-first, spec-validated bug fix |
| `/fix-flow` | Fix multi-step logic / orchestration issues |
| `/spec-diff` | Compare current code against spec, surface drift |
| `/task-next` | Pick the next unblocked task from the queue |
| `/task-done` | Mark task complete and update tracking |
| `/agent-spawn` | Spawn a scoped sub-agent with spec context injected |
| `/validate-output` | Check agent output against spec constraints |
| `/rollback-task` | Undo last task changes and requeue |
| `/spec-update` | Amend spec and re-evaluate affected tasks |
| `/scaffold` | Generate boilerplate from a spec section |
| `/explain-task` | Explain a task in plain English from the spec |

## Skills

| Skill | Description |
|-------|-------------|
| `write-spec` | Interactive spec wizard |
| `spec-to-plan` | Spec parsing + task generation |
| `coder-agent` | Isolated implement loop (one task at a time) |
| `spec-guardian` | Watches for spec drift during implementation |
| `rin-init` | Bootstrap a new Rin Kit project structure |

## Project Structure

```
.claude/
  commands/        # Slash command definitions
  skills/          # Reusable skill definitions
specs/             # Formal specifications (OpenAPI, Markdown)
plans/             # Generated plans from specs
tasks/             # tasks.json — atomic task queue
agents/            # Agent configuration files
docs/              # Documentation
```

## License

MIT
