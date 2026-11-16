#!/bin/sh
root="$(cd "$(dirname "$0")/../.." && pwd)"
log="$root/tmp/dev-serve.log"
mkdir -p "$root/tmp"
node_bin="$(command -v node 2>/dev/null)"
if [ -z "$node_bin" ]; then
  for candidate in "$HOME"/.nvm/versions/node/*/bin/node /opt/homebrew/bin/node /usr/local/bin/node; do
    if [ -x "$candidate" ]; then
      node_bin="$candidate"
    fi
  done
fi
printf '%s start pid=%s cwd=%s node=%s args=%s\n' "$(date -u +%FT%TZ)" "$$" "$(pwd)" "$node_bin" "$*" >> "$log"
"$node_bin" "$root/tools/dev/src/main.ts" --no-build serve "$@" 2>> "$log"
status=$?
printf '%s exit status=%s\n' "$(date -u +%FT%TZ)" "$status" >> "$log"
exit "$status"
