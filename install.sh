#!/bin/sh
# Rin Kit installer
# Usage:
#   sh install.sh              → install into current directory
#   sh install.sh ./my-project → install into a specific project

set -e

RIN_REPO="https://raw.githubusercontent.com/RinNguyens/Rin-Kit/main"
TARGET="${1:-.}"

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; RESET='\033[0m'
ok()   { printf "${GREEN}✓${RESET} %s\n" "$1"; }
warn() { printf "${YELLOW}⚠${RESET}  %s\n" "$1"; }
err()  { printf "${RED}✗${RESET} %s\n" "$1"; exit 1; }
info() { printf "  %s\n" "$1"; }

echo ""
echo "Rin AI Agent Kit — installer"
echo "────────────────────────────────"

[ -d "$TARGET" ] || err "Directory '$TARGET' does not exist."
TARGET="$(cd "$TARGET" && pwd)"
info "Installing into: $TARGET"
echo ""

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
if [ -f "$SCRIPT_DIR/.claude/CLAUDE.md" ]; then
  USE_LOCAL=true; info "Source: local ($SCRIPT_DIR)"
else
  USE_LOCAL=false; info "Source: GitHub ($RIN_REPO)"
fi
echo ""

# ── directories ───────────────────────────────────────────────────────────────
printf "Creating structure...\n"
mkdir -p "$TARGET/.claude/skills"
mkdir -p "$TARGET/specs/archive" "$TARGET/plans" "$TARGET/tasks" "$TARGET/docs/post-mortems"
ok "Directories created"

# ── install skills ────────────────────────────────────────────────────────────
SKILLS="write-spec spec-lint spec-to-plan spec-diff spec-update spec-split spec-merge
        import-spec retrofit-spec plan-fix explain-task
        task-next task-done rollback-task scaffold fix-bug fix-flow fix-issue
        validate-output review-patch impact-analysis
        write-tests test-coverage-check edge-case-hunt
        agent-spawn context-pack parallel-tasks checkpoint handoff
        progress-report changelog dead-code post-mortem pre-commit generate-pr
        rin-init rin-upgrade
        spec-parser issue-triage agent-brief focused-fix fix-verifier sub-agent-controller rin-doctor"

printf "Installing skills...\n"
if [ "$USE_LOCAL" = true ]; then
  for skill in $SKILLS; do
    src="$SCRIPT_DIR/.claude/skills/$skill/SKILL.md"
    if [ -f "$src" ]; then
      mkdir -p "$TARGET/.claude/skills/$skill"
      cp "$src" "$TARGET/.claude/skills/$skill/SKILL.md"
    else
      warn "Missing locally: $skill"
    fi
  done
else
  for skill in $SKILLS; do
    mkdir -p "$TARGET/.claude/skills/$skill"
    curl -fsSL "$RIN_REPO/.claude/skills/$skill/SKILL.md" \
      -o "$TARGET/.claude/skills/$skill/SKILL.md" 2>/dev/null \
      || warn "Could not download: $skill"
  done
fi

SKILL_COUNT=$(find "$TARGET/.claude/skills" -name "SKILL.md" | wc -l | tr -d ' ')
ok "Skills installed ($SKILL_COUNT skills)"

# ── CLAUDE.md ─────────────────────────────────────────────────────────────────
CLAUDE_DEST="$TARGET/.claude/CLAUDE.md"
if [ -f "$CLAUDE_DEST" ]; then
  warn "CLAUDE.md already exists — skipping"
else
  if [ "$USE_LOCAL" = true ]; then
    cp "$SCRIPT_DIR/.claude/CLAUDE.md" "$CLAUDE_DEST"
  else
    curl -fsSL "$RIN_REPO/.claude/CLAUDE.md" -o "$CLAUDE_DEST" 2>/dev/null
  fi
  ok "CLAUDE.md created"
fi

# ── tasks.json ────────────────────────────────────────────────────────────────
TASKS_PATH="$TARGET/tasks/tasks.json"
if [ -f "$TASKS_PATH" ]; then
  warn "tasks/tasks.json already exists — skipping"
else
  printf '{\n  "spec": null,\n  "tasks": []\n}\n' > "$TASKS_PATH"
  ok "tasks/tasks.json created"
fi

# ── .gitignore ────────────────────────────────────────────────────────────────
GITIGNORE="$TARGET/.gitignore"
ADDED=0
for entry in ".rin-context.md" ".rin-checkpoint.md" "handoff.md"; do
  if [ -f "$GITIGNORE" ] && grep -qF "$entry" "$GITIGNORE"; then continue; fi
  echo "$entry" >> "$GITIGNORE"
  ADDED=$((ADDED + 1))
done
[ "$ADDED" -gt 0 ] && ok ".gitignore updated ($ADDED entries added)"

# ── done ──────────────────────────────────────────────────────────────────────
echo ""
echo "────────────────────────────────"
printf "${GREEN}Rin Kit installed.${RESET}\n"
echo ""
echo "Next steps:"
echo "  1. Open this project in Claude Code"
echo "  2. /write-spec    — define your first feature"
echo "  3. /spec-to-plan  — generate your task list"
echo "  4. /task-next     — start implementing"
echo ""
