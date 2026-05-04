---
description: Parse a spec file and generate an ordered implementation plan
disable-model-invocation: true
---

1. List `specs/`. If multiple, ask which one. Read it fully.
2. Break into atomic tasks ordered by dependency: data layer → business logic → API/service → UI → tests.
3. Write `plans/<feature-name>-plan.md`:
   ```
   # Plan: <Feature>  Spec: specs/<name>.md  Created: <date>
   1. [ ] Task — _why first_
   2. [ ] Task — _depends on #1_
   Risks: <blockers>
   ```
4. Write `tasks/tasks.json`:
   ```json
   { "spec": "specs/<name>.md", "tasks": [
     { "id": 1, "title": "...", "status": "pending", "depends_on": [] }
   ]}
   ```
5. Tell user to run `/task-next`.
