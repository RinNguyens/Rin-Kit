# Rin AI Agent Kit

> **Specify-to-Implement** — The Spec is the single source of truth. No code is written until the logic is validated against the specification.

## Workflow

```
Specify → Plan → Tasks → Implement
    ↑                         |
    └─────── Spec Guardian ───┘
```

| Stage | Agent | Commands |
|-------|-------|----------|
| **Specify** | Architect Agent | `/write-spec`, `/spec-lint`, `/import-spec`, `/retrofit-spec` |
| **Plan** | Planner Agent | `/spec-to-plan`, `/plan-fix`, `/explain-task` |
| **Tasks** | — | `/task-next`, `/task-done`, `/rollback-task` |
| **Implement** | Coder Agent | `/scaffold`, `/fix-bug`, `/fix-flow` |
| **Validate** | Spec Guardian | `/validate-output`, `/spec-diff`, `/review-patch` |

## Install

```bash
npx rin-kit init
```

Or copy `.claude/` into your project root and run `/rin-init`.

## All Slash Commands

### Spec Lifecycle
| Command | Description |
|---------|-------------|
| `/write-spec` | Scaffold a formal spec (OpenAPI / Markdown template) |
| `/spec-lint` | Check spec quality — flag missing rules, ambiguous language |
| `/spec-to-plan` | Parse spec → ordered task list |
| `/spec-diff` | Compare current code against spec, surface drift |
| `/spec-update` | Amend spec and re-evaluate affected tasks |
| `/spec-split` | Break a large spec into focused sub-specs |
| `/spec-merge` | Merge two overlapping specs and resolve conflicts |
| `/import-spec` | Import OpenAPI / JSON Schema / Protobuf as a Rin spec |
| `/retrofit-spec` | Reverse-engineer a spec from existing code |

### Planning
| Command | Description |
|---------|-------------|
| `/plan-fix` | Identify gaps or conflicts in the current plan |
| `/explain-task` | Explain a task in plain English from the spec |

### Implementation
| Command | Description |
|---------|-------------|
| `/task-next` | Pick the next unblocked task and begin implementation |
| `/task-done` | Mark task complete and show next steps |
| `/rollback-task` | Undo last task changes and requeue |
| `/scaffold` | Generate boilerplate from a spec section |
| `/fix-bug` | Debug-first, spec-validated bug fix |
| `/fix-flow` | Fix multi-step logic / orchestration issues |

### Validation & Review
| Command | Description |
|---------|-------------|
| `/validate-output` | Check implementation against spec constraints |
| `/review-patch` | Review a diff against the spec before merging |
| `/impact-analysis` | Show which specs and tasks depend on a file before editing |

### Testing
| Command | Description |
|---------|-------------|
| `/write-tests` | Generate tests from spec Behavior rules and Error Cases |
| `/test-coverage-check` | Map existing tests to spec rules, find gaps |
| `/edge-case-hunt` | Generate boundary inputs from spec constraints |

### Agent Coordination
| Command | Description |
|---------|-------------|
| `/agent-spawn` | Spawn a scoped sub-agent with spec context injected |
| `/context-pack` | Bundle spec + plan + task into one file for sub-agents |
| `/parallel-tasks` | Run independent tasks as parallel sub-agents |
| `/checkpoint` | Save session state for resumption in a new session |
| `/handoff` | Package context for another agent or human collaborator |

### Project Health
| Command | Description |
|---------|-------------|
| `/progress-report` | Status report from tasks.json with completion % |
| `/changelog` | Draft changelog from completed tasks and spec versions |
| `/dead-code` | Find code not covered by any spec |
| `/post-mortem` | Trace a bug to its spec gap and patch both |

### CI / Git
| Command | Description |
|---------|-------------|
| `/pre-commit` | Spec validation gate before git commit |
| `/generate-pr` | Draft PR title and body from completed tasks |

### Kit Management
| Command | Description |
|---------|-------------|
| `/rin-init` | Bootstrap Rin Kit into an existing project |
| `/rin-upgrade` | Pull latest command definitions from the Rin Kit repo |

## Project Structure

```
.claude/
  CLAUDE.md            # Workflow rules and agent roles
  commands/            # 34 slash command definitions
specs/                 # Formal specifications
  archive/             # Retired specs
plans/                 # Generated plans
tasks/
  tasks.json           # Atomic task queue
docs/
  post-mortems/        # Post-mortem documents
```

## License

MIT
