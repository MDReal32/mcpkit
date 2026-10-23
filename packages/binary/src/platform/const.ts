export const TARGETS = [
  "linux-x64",
  "linux-arm64",
  "linux-x64-musl",
  "linux-arm64-musl",
  "darwin-x64",
  "darwin-arm64",
  "windows-x64",
] as const;

export const BINARY_NAME = "mcpkit";

/** Each target is published as `@usemcpkit/cli-<target>` holding `bin/mcpkit[.exe]`. */
export const PLATFORM_PACKAGE_PREFIX = "@usemcpkit/cli-";

export const PLATFORM_PACKAGE_BIN_DIR = "bin";

export const MUSL_LOADER_PREFIX = "ld-musl-";

export const MUSL_LOADER_DIR = "/lib";
