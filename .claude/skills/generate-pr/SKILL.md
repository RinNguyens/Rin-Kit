---
description: Draft a PR title and body from completed tasks and spec changes
disable-model-invocation: true
allowed-tools: Bash(git log *) Bash(git diff *) Bash(gh pr create *) Bash(gh pr view *)
---

## Branch commits
!`git log main...HEAD --oneline`

1. Read `tasks/tasks.json` — completed tasks on this branch.
2. Read linked spec for feature name and version.
3. Draft PR:
   ```markdown
   ## Summary  <1-3 sentences from spec overview>
   ## Changes  <one bullet per completed task>
   ## Spec Reference  specs/<name>.md v<N> — all rules validated via /validate-output
   ## Test Plan  - [ ] <test command>  - [ ] happy path  - [ ] error case
   ## Checklist  - [ ] Spec-compliant  - [ ] Error cases  - [ ] No dead code
   ```
4. Ask user: run `gh pr create` or copy manually?
