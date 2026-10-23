#!/usr/bin/env bash
# Creates the GitHub Release for the current @usemcpkit/cli version with every compiled binary and a
# SHA256SUMS file. winget, Homebrew and Scoop download these assets, so the tag is created once per version.
set -euo pipefail

version="$(node -p "require('./apps/cli/package.json').version")"
tag="v${version}"

if gh release view "$tag" >/dev/null 2>&1; then
  echo "skip release $tag (already exists)"
  exit 0
fi

binaries=(apps/cli/build/bin/mcpkit-*)
if [ ! -e "${binaries[0]}" ]; then
  echo "no binaries in apps/cli/build/bin; run yarn package first" >&2
  exit 1
fi

assets="$(mktemp -d)"
cp "${binaries[@]}" "$assets/"
(cd "$assets" && shasum -a 256 mcpkit-* > SHA256SUMS)

echo "release $tag"
gh release create "$tag" "$assets"/* --target "$GITHUB_SHA" --title "mcpkit ${version}" --generate-notes
