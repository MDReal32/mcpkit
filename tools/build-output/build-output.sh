#!/usr/bin/env bash
# Replaces <workspace root>/build with a copy of every project's build and the Rust release binaries. The projects
# keep their own build folders, since npm packs only what is inside a package and `exports` cannot leave it.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
OUT="$ROOT/build"
CARGO_RELEASE_DIR="$ROOT/target/release"

PROJECT_BUILDS=(
  "apps/analytics/build:analytics"
  "apps/npx/build:npx"
  "packages/core/build:core"
  "packages/native/build:native"
  "packages/servers/build:servers"
  "apps/site/build:site"
  "apps/window/ui/build:ui"
)
RELEASE_BINARIES=(usemcpkit usemcpkit-servers usemcpkit-window)

rm -rf "$OUT"
mkdir -p "$OUT"

for build in "${PROJECT_BUILDS[@]}"; do
  cp -R "$ROOT/${build%%:*}" "$OUT/${build#*:}"
done

for binary in "${RELEASE_BINARIES[@]}"; do
  if [ -f "$CARGO_RELEASE_DIR/$binary.exe" ]; then
    cp "$CARGO_RELEASE_DIR/$binary.exe" "$OUT/"
  else
    cp "$CARGO_RELEASE_DIR/$binary" "$OUT/"
  fi
done

echo "build output collected in $OUT"
