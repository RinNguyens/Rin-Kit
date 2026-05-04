---
description: Spawn a scoped sub-agent with spec context injected
---

1. Read the active spec and the current task from `tasks/tasks.json`.
2. Ask the user what the sub-agent should focus on (e.g., "write tests for task #3").
3. Construct a scoped prompt that includes:
   - The relevant spec section
   - The task definition
   - Constraints (what the agent must NOT do)
4. Spawn the agent using the Agent tool with the scoped prompt.
5. Review the agent's output against the spec before accepting it.
