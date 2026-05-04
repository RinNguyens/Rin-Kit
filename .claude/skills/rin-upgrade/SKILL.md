---
description: Pull latest command definitions from the Rin Kit repo
disable-model-invocation: true
---

1. Check if the Rin Kit source repo is configured:
   - Look for `.rin-source` file or `rin.source` field in `package.json`
   - Default source: `https://github.com/<your-username>/Rin`

2. Run `git ls-remote <source>` to check if the repo is reachable.
3. Show the user what will be updated:
   - New commands added since their version
   - Modified commands that differ from their local copy
   - Commands removed upstream

4. Ask for confirmation before overwriting.
5. Copy updated command files to `.claude/commands/`.
6. Do NOT overwrite any command the user has locally modified (check git diff).
7. Report what was updated, added, and skipped.

**Manual upgrade:**
```bash
curl -fsSL https://raw.githubusercontent.com/<user>/Rin/main/install.sh | sh
```
