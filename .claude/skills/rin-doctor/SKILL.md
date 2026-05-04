---
name: rin-doctor
description: Diagnose Rin Kit setup — missing files, broken links, invalid JSON
allowed-tools: Bash(ls *) Bash(cat tasks/tasks.json)
---

## Project state
!`ls -d specs tasks plans .claude/skills 2>&1 && echo "---" && cat tasks/tasks.json 2>/dev/null || echo "tasks.json missing"`

Check the above output against:
- Structure: `.claude/CLAUDE.md` · `.claude/skills/` (≥1 subdirectory with SKILL.md) · `specs/` · `plans/` · `tasks/tasks.json`
- tasks.json: has `spec` + `tasks` array · each task has `id/title/status/depends_on` · no circular deps · no done task with incomplete deps
- Spec health: all specs reachable from tasks.json · each has Overview/Inputs/Outputs/Behavior · no `draft` spec linked to `in_progress` tasks
- Links: all `depends_on` IDs exist · spec path in tasks.json exists in `specs/`

Report:
```
Rin Doctor — <project>
✓/✗/⚠ Structure: <result>
✓/✗/⚠ tasks.json: <result>
✓/✗/⚠ Spec health: <result>
✓/✗/⚠ Links: <result>
Issues: N  (run /plan-fix if task issues)
```
