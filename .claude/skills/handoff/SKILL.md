---
description: Package context for handoff to another agent or human collaborator
disable-model-invocation: true
allowed-tools: Bash(git log *)
---

## Recent commits
!`git log --oneline -10`

1. Ask: handoff to agent, developer, or PR reviewer?
2. Read `tasks/tasks.json` and active spec.
3. Write `handoff.md`:
   ```
   # Handoff — <date>
   ## Built / Current state / Next 3 tasks / Blockers
   ## How to continue: read specs/<name>.md → tasks/tasks.json task #N → /task-next
   ## Key files: <file — purpose>
   ```
4. Agent handoff → also run `/context-pack`.
5. Human handoff → offer GitHub Issue or PR comment.
