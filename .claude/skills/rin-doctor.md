---
name: rin-doctor
description: Diagnose issues with the Rin Kit setup — missing files, broken links, invalid JSON
type: skill
---

# Rin Doctor Skill

Run this skill to check if the Rin Kit is correctly set up in the current project.

## Checks

### Structure
- [ ] `.claude/CLAUDE.md` exists
- [ ] `.claude/commands/` directory exists and has at least one `.md` file
- [ ] `.claude/skills/` directory exists
- [ ] `specs/` directory exists
- [ ] `plans/` directory exists
- [ ] `tasks/` directory exists
- [ ] `tasks/tasks.json` exists and is valid JSON

### tasks.json validity
- [ ] Has `spec` field (string or null)
- [ ] Has `tasks` array
- [ ] Each task has `id`, `title`, `status`, `depends_on`
- [ ] No circular dependencies in `depends_on`
- [ ] No tasks with `status: done` that have incomplete dependencies

### Spec health
- [ ] All specs in `specs/` are reachable from `tasks.json`
- [ ] All specs have required sections (Overview, Inputs, Outputs, Behavior)
- [ ] No spec has `Status: draft` that is also linked to `in_progress` tasks

### Links
- [ ] All `depends_on` task IDs in `tasks.json` actually exist
- [ ] Spec file referenced in `tasks.json` actually exists in `specs/`

## Output

```
Rin Doctor — <project name>

✓ Structure: OK
✗ tasks.json: Task #5 depends_on #9, but #9 does not exist
✓ Spec health: OK
⚠ Links: tasks.json references specs/auth.md but file not found

Issues: 2
Run `/plan-fix` to resolve task dependency issues.
```
