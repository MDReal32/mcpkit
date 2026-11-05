#!/usr/bin/env bash
# Creates the GitHub Release for the current usemcpkit version with both binaries of every target
# (`usemcpkit-<target>[.exe]`, `usemcpkit-servers-<target>[.exe]`) and a SHA256SUMS file. winget and Homebrew download
# these assets, so the tag is created once per version.
set -euo pipefail

version="$(node -p "require('./apps/npx/package.json').version")"
tag="v${version}"

if gh release view "$tag" >/dev/null 2>&1; then
  echo "skip release $tag (already exists)"
  exit 0
fi

binaries=(release/bin/usemcpkit-*)
if [ ! -e "${binaries[0]}" ]; then
  echo "no binaries in release/bin; run tools/release first" >&2
  exit 1
fi

assets="$(mktemp -d)"
cp "${binaries[@]}" "$assets/"
(cd "$assets" && shasum -a 256 usemcpkit-* > SHA256SUMS)

echo "release $tag"
gh release create "$tag" "$assets"/* --target "$GITHUB_SHA" --title "usemcpkit ${version}" --generate-notes
