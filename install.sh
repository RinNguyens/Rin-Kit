#!/bin/sh
# Rin Kit installer
# Usage:
#   sh install.sh              → install into current directory
#   sh install.sh ./my-project → install into a specific project

set -e

RIN_REPO="https://raw.githubusercontent.com/RinNguyens/Rin-Kit/main"
TARGET="${1:-.}"

# ── colors ──────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
RESET='\033[0m'

ok()   { printf "${GREEN}✓${RESET} %s\n" "$1"; }
warn() { printf "${YELLOW}⚠${RESET}  %s\n" "$1"; }
err()  { printf "${RED}✗${RESET} %s\n" "$1"; exit 1; }
info() { printf "  %s\n" "$1"; }

echo ""
echo "Rin AI Agent Kit — installer"
echo "────────────────────────────────"

# ── target directory ─────────────────────────────────────────────────────────
if [ ! -d "$TARGET" ]; then
  err "Target directory '$TARGET' does not exist."
fi
TARGET="$(cd "$TARGET" && pwd)"
info "Installing into: $TARGET"
echo ""

# ── detect install mode ───────────────────────────────────────────────────────
# If running from the Rin Kit repo itself, copy local files.
# Otherwise, download from GitHub.
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
if [ -f "$SCRIPT_DIR/.claude/CLAUDE.md" ]; then
  USE_LOCAL=true
  info "Source: local files ($SCRIPT_DIR)"
else
  USE_LOCAL=false
  info "Source: GitHub ($RIN_REPO)"
fi
echo ""

# ── create directory structure ────────────────────────────────────────────────
printf "Creating project structure...\n"
mkdir -p "$TARGET/.claude/commands"
mkdir -p "$TARGET/.claude/skills"
mkdir -p "$TARGET/specs/archive"
mkdir -p "$TARGET/plans"
mkdir -p "$TARGET/tasks"
mkdir -p "$TARGET/docs/post-mortems"
ok "Directories created"

# ── copy or download commands ─────────────────────────────────────────────────
printf "Installing commands...\n"
if [ "$USE_LOCAL" = true ]; then
  cp "$SCRIPT_DIR/.claude/commands/"*.md "$TARGET/.claude/commands/"
  cp "$SCRIPT_DIR/.claude/skills/"*.md   "$TARGET/.claude/skills/"
else
  COMMANDS="write-spec spec-lint spec-to-plan spec-diff spec-update spec-split spec-merge
            import-spec retrofit-spec plan-fix explain-task task-next task-done rollback-task
            scaffold fix-bug fix-flow fix-issue validate-output review-patch impact-analysis
            write-tests test-coverage-check edge-case-hunt agent-spawn context-pack
            parallel-tasks checkpoint handoff progress-report changelog dead-code post-mortem
            pre-commit generate-pr rin-init rin-upgrade"
  for cmd in $COMMANDS; do
    curl -fsSL "$RIN_REPO/.claude/commands/${cmd}.md" \
      -o "$TARGET/.claude/commands/${cmd}.md" 2>/dev/null \
      || warn "Could not download command: $cmd"
  done

  SKILLS="spec-parser issue-triage agent-brief focused-fix fix-verifier sub-agent-controller rin-doctor"
  for skill in $SKILLS; do
    curl -fsSL "$RIN_REPO/.claude/skills/${skill}.md" \
      -o "$TARGET/.claude/skills/${skill}.md" 2>/dev/null \
      || warn "Could not download skill: $skill"
  done
fi
ok "Commands installed ($(ls "$TARGET/.claude/commands" | wc -l | tr -d ' ') commands)"
ok "Skills installed ($(ls "$TARGET/.claude/skills" | wc -l | tr -d ' ') skills)"

# ── CLAUDE.md ─────────────────────────────────────────────────────────────────
if [ -f "$TARGET/.claude/CLAUDE.md" ]; then
  warn "CLAUDE.md already exists — skipping (not overwritten)"
else
  if [ "$USE_LOCAL" = true ]; then
    cp "$SCRIPT_DIR/.claude/CLAUDE.md" "$TARGET/.claude/CLAUDE.md"
  else
    curl -fsSL "$RIN_REPO/.claude/CLAUDE.md" -o "$TARGET/.claude/CLAUDE.md" 2>/dev/null
  fi
  ok "CLAUDE.md created"
fi

# ── tasks.json ────────────────────────────────────────────────────────────────
if [ -f "$TARGET/tasks/tasks.json" ]; then
  warn "tasks/tasks.json already exists — skipping"
else
  cat > "$TARGET/tasks/tasks.json" <<'JSON'
{
  "spec": null,
  "tasks": []
}
JSON
  ok "tasks/tasks.json created"
fi

# ── .gitignore entries ────────────────────────────────────────────────────────
GITIGNORE="$TARGET/.gitignore"
ENTRIES=".rin-context.md
.rin-checkpoint.md
handoff.md"

if [ -f "$GITIGNORE" ]; then
  ADDED=0
  for entry in $ENTRIES; do
    if ! grep -qF "$entry" "$GITIGNORE"; then
      echo "$entry" >> "$GITIGNORE"
      ADDED=$((ADDED + 1))
    fi
  done
  [ "$ADDED" -gt 0 ] && ok ".gitignore updated ($ADDED entries added)"
else
  printf "%s\n" $ENTRIES > "$GITIGNORE"
  ok ".gitignore created"
fi

# ── done ──────────────────────────────────────────────────────────────────────
echo ""
echo "────────────────────────────────"
printf "${GREEN}Rin Kit installed successfully.${RESET}\n"
echo ""
echo "Next steps:"
echo "  1. Open this project in Claude Code"
echo "  2. Run /write-spec to define your first feature"
echo "  3. Run /spec-to-plan to generate your task list"
echo "  4. Run /task-next to start implementing"
echo ""
echo "All commands: /rin-init lists them, or check .claude/commands/"
echo ""
