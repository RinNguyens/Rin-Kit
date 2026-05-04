---
name: sub-agent-controller
description: Rules for spawning sub-agents efficiently — scope, token budget, escalation
user-invocable: false
---

Read before spawning any sub-agent:

1. **Triage first** — never spawn a fix agent without triaging. Triage: ~500tk. Fix: ~2,500tk.
2. **Brief, don't forward** — write an `agent-brief` (500–1,500tk) not full conversation history (10k–50k tk).
3. **One agent, one job** — one task + one output contract per agent.
4. **Name exact files** — never say "find relevant files." Unknown files → triage first.
5. **Structured output only** — JSON or strict template. No prose.
6. **Stop conditions** — define in every brief: "stop after JSON", "max 3 edits", "stop if file not in list".
7. **Escalate, don't explore** — out-of-scope file or low confidence → output escalation flag, stop.

Spawn decision:
- Clearly scoped → brief → `focused-fix`
- Unclear scope → `issue-triage` → brief → `focused-fix`
- Multi-file → `impact-analysis` first
- Verify FAIL → new brief (corrected) → new `focused-fix` (never reuse failed agent)

Pipeline cost: Triage(~500tk) + Brief(~0tk) + Fix(~2,500tk) + Verify(~500tk) = **~3,500tk total**
