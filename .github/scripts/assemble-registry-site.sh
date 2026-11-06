#!/usr/bin/env bash
# Builds the GitHub Pages site of the registry in <site dir>: the registry just built at the root (what releases up to
# 0.12.0 read) and in `v<version>/` for the current version, plus `v<version>/` of every earlier release that ships a
# `registry.tar.gz` asset, so each binary keeps reading the manifests of its own version. GitHub Pages replaces the
# whole site on every deploy, which is why the earlier versions are unpacked again each time.
set -euo pipefail

registry="${1:?usage: assemble-registry-site.sh <registry dir> <site dir>}"
site="${2:?usage: assemble-registry-site.sh <registry dir> <site dir>}"
registry_archive="registry.tar.gz"

version="$(node -p "require('./apps/npx/package.json').version")"
current="v${version}"

rm -rf "$site"
mkdir -p "$site/$current"
cp -R "$registry/." "$site/"
cp -R "$registry/." "$site/$current/"
echo "registry $current (this build)"

downloads="$(mktemp -d)"
trap 'rm -rf "$downloads"' EXIT

gh release list --limit 1000 --json tagName --jq '.[].tagName' | while read -r tag; do
  if [ "$tag" = "$current" ]; then
    continue
  fi
  if ! gh release view "$tag" --json assets --jq '.assets[].name' | grep -qx "$registry_archive"; then
    echo "skip registry $tag (no $registry_archive)"
    continue
  fi
  gh release download "$tag" --pattern "$registry_archive" --output "$downloads/$tag.tar.gz" --clobber
  mkdir -p "$site/$tag"
  tar -xzf "$downloads/$tag.tar.gz" -C "$site/$tag"
  echo "registry $tag (from its release)"
done
