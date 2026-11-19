#!/bin/sh
source="$0"
while [ -h "$source" ]; do
  directory="$(cd "$(dirname "$source")" && pwd)"
  source="$(readlink "$source")"
  case "$source" in
    /*) ;;
    *) source="$directory/$source" ;;
  esac
done
root="$(cd "$(dirname "$source")/../.." && pwd)"
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
PATH="$(dirname "$node_bin"):$HOME/.cargo/bin:$PATH"
export PATH
printf '%s start pid=%s cwd=%s node=%s args=%s\n' "$(date -u +%FT%TZ)" "$$" "$(pwd)" "$node_bin" "$*" >> "$log"
"$node_bin" --import "$root/tools/ts-resolver/src/register.ts" "$root/tools/dev/src/main.ts" serve "$@" 2>> "$log"
status=$?
printf '%s exit status=%s\n' "$(date -u +%FT%TZ)" "$status" >> "$log"
exit "$status"
