---
name: sub-agent-controller
description: Meta-skill for orchestrating sub-agents efficiently — controls scope, token budget, and escalation
type: skill
---

# Sub-Agent Controller Skill

Use this skill whenever you need to spawn sub-agents. It defines the rules for efficient orchestration.

## Core Principles

### 1. Triage before spawning
Never spawn a fix agent without triaging first. Triage is cheap. Fix agents are expensive.

```
Triage → Brief → Fix → Verify
  ~500tk   ~0tk  ~2k tk  ~500tk
```

### 2. Brief, don't forward
Never pass your full conversation to a sub-agent. Write an `agent-brief` instead.
- Full conversation: 10k–50k tokens
- Agent brief: 500–1500 tokens
- Savings: 90%+

### 3. One agent, one job
Each agent has exactly one task and one output contract. If a task requires two jobs, spawn two agents sequentially — not one agent with two jobs.

### 4. Explicit file lists
Every agent brief must name exact files. Never say "look at the codebase" or "find the relevant files." If you don't know the files, run triage first.

### 5. Structured output only
Agents must return JSON or a strict template. Prose output cannot be reliably parsed by the next stage and wastes tokens.

### 6. Stop conditions
Every agent must know when to stop. Define it in the brief:
- "Stop after returning the JSON"
- "Stop after editing at most 3 files"
- "Stop if you need to read a file not in this list"

### 7. Escalation rules
An agent should escalate (stop and report) rather than explore when:
- The fix requires reading files not in the brief
- The fix would affect a different feature's spec
- Confidence is low
- The issue type is `unknown`

## Spawn Decision Tree

```
Is the issue clearly scoped?
  YES → Write brief → spawn focused-fix directly
  NO  → Run issue-triage first → then brief → spawn focused-fix

Is it a multi-file change?
  YES → Run impact-analysis first → check for parallel safety
  NO  → Single focused-fix agent

Did verify return FAIL?
  YES → Extract failure reason → update brief → spawn new focused-fix
        (do NOT re-use the failed agent — start fresh with a corrected brief)
  NO  → Commit
```

## Token Budget Guidelines

| Agent Type | Expected Token Cost | Max Files |
|---|---|---|
| Triage | ~300–600 | 2 |
| Agent Brief assembly | ~0 (no LLM) | — |
| Focused Fix | ~1,500–3,000 | 3 |
| Verifier | ~300–600 | 0 (diff only) |
| **Total pipeline** | **~2,500–4,500** | **5** |

Compare to: one unscoped "fix this bug" agent = 10,000–40,000 tokens with lower accuracy.
