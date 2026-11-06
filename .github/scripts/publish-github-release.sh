#!/usr/bin/env bash
# Creates the GitHub Release for the current usemcpkit version with both binaries of every target
# (`usemcpkit-<target>[.exe]`, `usemcpkit-servers-<target>[.exe]`), a SHA256SUMS file and the registry of this version
# (`registry.tar.gz`). winget and Homebrew download the binaries, so the tag is created once per version; the registry
# asset is replaced on every run, since the registry deploy rebuilds each version's `v<version>/` folder from it.
set -euo pipefail

version="$(node -p "require('./apps/npx/package.json').version")"
tag="v${version}"

registry_archive="registry.tar.gz"
if [ ! -f "$registry_archive" ]; then
  echo "no $registry_archive; pack the registry first" >&2
  exit 1
fi

if gh release view "$tag" >/dev/null 2>&1; then
  echo "update the registry of release $tag (the release already exists)"
  gh release upload "$tag" "$registry_archive" --clobber
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
cp "$registry_archive" "$assets/"

echo "release $tag"
gh release create "$tag" "$assets"/* --target "$GITHUB_SHA" --title "usemcpkit ${version}" --generate-notes
