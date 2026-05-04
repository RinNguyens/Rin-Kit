---
description: Bundle spec + plan + current task into a single context file for sub-agents
---

1. Read `tasks/tasks.json` — find the current in-progress task or ask the user which task.
2. Read the linked spec from `specs/`.
3. Read the active plan from `plans/`.
4. Write a context bundle to `.rin-context.md`:

```markdown
# Rin Context Pack
**Generated:** <date>
**Active Task:** #<id> — <title>

## Spec (authoritative)
<full spec content>

## Task Definition
<task object from tasks.json>

## Dependencies
Tasks that must be done before this one: <list>

## Already Implemented
Tasks with status "done": <list with titles>

## Constraints for this agent
- Implement only task #<id>
- Do not modify files outside the task's scope
- Validate output against spec before reporting done
```

5. Tell the user to paste `.rin-context.md` into any sub-agent prompt to give it full workflow context.
