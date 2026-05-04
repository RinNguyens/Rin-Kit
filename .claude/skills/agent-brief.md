---
name: agent-brief
description: Assemble a minimal, scoped context bundle for a sub-agent — token-efficient alternative to passing full conversation history
type: skill
---

# Agent Brief Skill

An **agent brief** is a small, self-contained document that gives a sub-agent everything it needs and nothing it doesn't. Use this instead of forwarding the full conversation.

## When to use
Before spawning any sub-agent. Write the brief first, then pass it as the agent's entire context.

## Brief Template

```markdown
# Agent Brief
**Role:** <what this agent is>
**Task:** <one sentence — exactly what to do>
**Stop condition:** <when to stop — don't explore beyond this>

## Read these files (only these)
- path/to/file1.ts
- path/to/file2.ts

## Relevant spec section
<paste only the specific rules from the spec that apply — not the whole spec>

## Output contract
Return structured output in this exact format:
<define the exact JSON or markdown format>
Do NOT return prose. Do NOT read additional files.

## Constraints
- Max files to read: <N>
- Max edits: <describe scope>
- Do not: <list explicit prohibitions>
```

## Rules for writing a good brief

1. **Never paste the full spec** — extract only the rules that apply
2. **Never say "read the codebase"** — name exact files
3. **Always define the output format** — structured output = fewer tokens
4. **Always define stop conditions** — agents that don't know when to stop keep going
5. **Include the error message verbatim** — don't paraphrase
6. **State what NOT to do** — prevents scope creep
