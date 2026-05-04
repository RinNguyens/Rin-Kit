---
description: Bootstrap Rin Kit into an existing project
disable-model-invocation: true
---

1. Check if `.claude/skills/` already exists. If it does, warn the user and ask before overwriting.
2. Detect the project type (Node.js, Python, Go, etc.) by reading config files.
3. Create the Rin Kit directory structure:
   ```
   .claude/
     CLAUDE.md          ← Rin workflow rules
     skills/            ← all skills (each in its own <name>/SKILL.md directory)
   specs/               ← empty, ready for first spec
   plans/               ← empty
   tasks/
     tasks.json         ← empty task queue
   docs/
     post-mortems/      ← empty
   ```

4. Write `tasks/tasks.json` with an empty queue:
   ```json
   { "spec": null, "tasks": [] }
   ```

5. Add to `.gitignore`:
   ```
   .rin-context.md
   .rin-checkpoint.md
   handoff.md
   ```

6. Tell the user:
   - "Rin Kit is ready. Start with `/write-spec` to define your first feature."
   - List available commands.

**Note:** To install via CLI: `npx rin-kit init`
