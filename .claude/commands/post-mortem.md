---
description: After a bug, trace it back to the spec gap that allowed it and patch both
---

1. Ask the user to describe the bug: what went wrong in production or testing.
2. Read the relevant spec.
3. Trace the bug:
   - **Code level**: which file and function contained the bug
   - **Spec level**: which rule was missing, ambiguous, or wrong that allowed this bug
   - **Process level**: at what stage should this have been caught (spec-lint, tests, validate-output)

4. Write a post-mortem to `docs/post-mortems/<date>-<slug>.md`:

```markdown
# Post-Mortem: <bug title>
**Date:** <date>
**Severity:** low | medium | high

## What happened
<plain description>

## Root cause
<code-level cause>

## Spec gap
<which spec rule was missing or wrong>

## Fix applied
<what was changed in code>

## Spec patch
<what was added/changed in the spec>

## Prevention
<what process change prevents this class of bug>
```

5. Update the spec to add or clarify the missing rule.
6. Run `/write-tests` to add a regression test for this exact scenario.
