---
description: Package context for handoff to another agent or human collaborator
---

1. Ask the user who the handoff is for: another Claude agent, a human developer, or a PR reviewer.
2. Read `tasks/tasks.json`, the active spec, and recent `git log --oneline -10`.
3. Write a `handoff.md` in the project root:

```markdown
# Handoff — <date>

## What was built
<summary of completed tasks>

## Current state
<in-progress task and what's done / not done>

## What comes next
<next 3 unblocked tasks from tasks.json>

## Known issues / blockers
<anything flagged as blocked or needs-review>

## How to continue
1. Read `specs/<name>.md` — this is the authority
2. Read `tasks/tasks.json` — pick up from task #<N>
3. Run `/task-next` to start implementing

## File map
<key files touched so far and their purpose>
```

4. If handing off to an agent: also run `/context-pack` to generate the machine-readable bundle.
5. If handing off to a human: offer to create a GitHub Issue or PR comment with the handoff content.
