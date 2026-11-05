#!/usr/bin/env bash
# Publishes usemcpkit packages whose version is not on npm yet. The release workflow runs the steps in parallel jobs:
#   platforms            prints the per-OS package dirs as a JSON array (the job matrix)
#   pack <dir>           `yarn pack` core and the wrapper into <dir> (rewrites `workspace:*` and `publishConfig`)
#   publish-dir <dir>    publish one package directory
#   publish-lib <dir> <tarballs>  publish one workspace (packages/core, apps/npx) from the `pack` tarballs
# The platform packages are written to release/npm by tools/release, which also lists them in the wrapper.
set -euo pipefail

LIB_DIRS=(packages/core apps/npx)
PLATFORMS_DIR=release/npm

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
  npm publish "./$source" --access public
}

command="${1:?usage: publish-npm.sh platforms|pack <dir>|publish-dir <dir>|publish-lib <dir> <tarballs>}"

case "$command" in
  platforms)
    shopt -s nullglob
    dirs=("$PLATFORMS_DIR"/cli-*/)
    if [ "${#dirs[@]}" -eq 0 ]; then
      echo "no platform packages in $PLATFORMS_DIR; run tools/release first" >&2
      exit 1
    fi
    printf '%s\n' "${dirs[@]%/}" | node -e 'console.log(JSON.stringify(require("fs").readFileSync(0, "utf8").trim().split("\n")))'
    ;;
  pack)
    mkdir -p "$2"
    out="$(cd "$2" && pwd)"
    for dir in "${LIB_DIRS[@]}"; do
      yarn workspace "$(read_field "$dir" name)" pack --out "$out/$(basename "$dir").tgz"
    done
    ;;
  publish-dir)
    publish "$2" "$2"
    ;;
  publish-lib)
    publish "$2" "$3/$(basename "$2").tgz"
    ;;
  *)
    echo "unknown command: $command" >&2
    exit 1
    ;;
esac
