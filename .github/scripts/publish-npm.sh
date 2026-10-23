#!/usr/bin/env bash
# Publishes every public mcpkit package whose version is not on npm yet, dependencies first:
# the per-OS binaries, @mcpkit/core, @mcpkit/cli, then the `mcpkit` wrapper that depends on it.
# Workspaces go through `yarn pack` so `workspace:*` and `publishConfig` are rewritten before npm sees them.
set -euo pipefail

tarballs="$(mktemp -d)"

read_field() {
  node -p "require(process.argv[1]).$2" "$PWD/$1/package.json"
}

is_published() {
  [ "$(npm view "$1@$2" version 2>/dev/null || true)" = "$2" ]
}

publish() {
  local dir="$1" source="$2" name version
  name="$(read_field "$dir" name)"
  version="$(read_field "$dir" version)"
  if is_published "$name" "$version"; then
    echo "skip $name@$version (already on npm)"
    return
  fi
  echo "publish $name@$version"
  npm publish "$source" --access public
}

publish_workspace() {
  local dir="$1" tarball
  tarball="$tarballs/$(basename "$dir").tgz"
  yarn workspace "$(read_field "$dir" name)" pack --out "$tarball"
  publish "$dir" "$tarball"
}

for dir in apps/cli/build/npm/cli-*/; do
  publish "${dir%/}" "${dir%/}"
done
publish_workspace packages/core
publish_workspace apps/cli
publish_workspace apps/npx
