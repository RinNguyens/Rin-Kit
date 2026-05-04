---
description: Draft a PR title and body from completed tasks and spec changes
---

1. Run `git log main...HEAD --oneline` to see all commits on the branch.
2. Read `tasks/tasks.json` — find all tasks completed in this branch (status: done).
3. Read the linked spec — note the feature name and any version bumps.
4. Draft a PR:

```markdown
## Summary
<1-3 sentences: what feature was built and why, from the spec overview>

## Changes
<bulleted list of completed tasks — each task = one bullet>

## Spec Reference
- Spec: `specs/<name>.md` v<version>
- All behavior rules validated via `/validate-output`

## Test Plan
- [ ] Run test suite: `<test command>`
- [ ] Verify happy path: <key scenario from spec>
- [ ] Verify error case: <key error case from spec>

## Checklist
- [ ] Spec-compliant (all Behavior rules implemented)
- [ ] Error cases handled
- [ ] No uncovered dead code introduced
```

5. Ask the user if they want to run `gh pr create` with this draft, or copy it manually.
