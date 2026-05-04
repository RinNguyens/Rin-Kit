---
description: Fix multi-step logic or agent orchestration issues
---

1. Ask the user to describe where the flow breaks (which step, what input, what wrong output).
2. Read the spec's **Behavior** section — map each step to code.
3. Trace the execution path step by step to find where it diverges from the spec.
4. Fix the orchestration logic (not just the output of one step).
5. Run `/validate-output` on the full flow after fixing.
