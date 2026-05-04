---
description: Run spec validation before allowing a commit — enforce spec-first at the git level
---

This command is designed to be called from a git pre-commit hook.

1. Check if `specs/` has at least one approved spec (`Status: approved`). If not, warn but don't block.
2. Run `git diff --cached --name-only` to get staged files.
3. For each staged file, find the spec that governs it (by feature name or path convention).
4. Run the equivalent of `/validate-output` on the staged changes against the spec:
   - Do the changes match spec Behavior rules?
   - Are new fields in the spec?
   - Are removed fields still required by the spec?
5. Report:
   - `PASS` — commit proceeds
   - `WARN` — commit proceeds with warning message
   - `FAIL` — block commit, show what spec rule is violated

**To install as a git hook:**
```bash
echo '#!/bin/sh\nclaude --print "/pre-commit" 2>&1' > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```
