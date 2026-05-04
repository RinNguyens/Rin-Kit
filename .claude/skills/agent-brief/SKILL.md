---
name: agent-brief
description: Assemble a minimal scoped context bundle for a sub-agent — replaces forwarding conversation history
user-invocable: false
---

Write before spawning any sub-agent. Pass the brief as the agent's entire input.

```markdown
# Agent Brief
**Role:** <what this agent does>
**Task:** <one sentence>
**Stop:** <when to stop — do not explore beyond this>

## Files (only these)
- path/to/file1
- path/to/file2

## Spec rules (paste text, not the whole spec)
<only the rule lines that apply>

## Output contract
<exact JSON or template — no prose>

## Constraints
Max files: <N> | Max edits: <scope> | Do not: <prohibitions>
```

Rules: extract only relevant rules (never the full spec) · name exact files (never "read the codebase") · always define output format and stop condition.
