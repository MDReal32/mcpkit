import type { ReleaseTarget } from "./types/release-target.ts";

/**
 * The targets CI builds, named as `Target::name()` in `crates/binary` names them, since the runner's updater asks npm
 * for `@usemcpkit/cli-<name>`. The musl targets are left out: the server links WebKitGTK, which has no static build.
 */
export const RELEASE_TARGETS: readonly ReleaseTarget[] = [
  { name: "linux-x64", os: "linux", cpu: "x64", libc: "glibc" },
  { name: "linux-arm64", os: "linux", cpu: "arm64", libc: "glibc" },
  { name: "darwin-x64", os: "darwin", cpu: "x64" },
  { name: "darwin-arm64", os: "darwin", cpu: "arm64" },
  { name: "windows-x64", os: "win32", cpu: "x64" },
];

/** The runner and the server it runs from the same folder; every platform package holds both. */
export const RELEASE_BINARIES = ["usemcpkit", "usemcpkit-servers"] as const;

/** CI uploads each target's binaries as the artifact `binaries-<target>`. */
export const BINARIES_ARTIFACT_PREFIX = "binaries-";

export const PLATFORM_PACKAGE_PREFIX = "@usemcpkit/cli-";

/** The folder inside a platform package the updater reads the binaries from (`package/bin/…` in its tarball). */
export const PLATFORM_PACKAGE_BIN_DIR = "bin";

export const NPM_OUTPUT_DIR = "npm";

export const ASSETS_OUTPUT_DIR = "bin";

export const PLATFORM_PACKAGE_LICENSE = "MIT";

export const PLATFORM_PACKAGE_REPOSITORY_URL = "git+https://github.com/MDReal32/mcpkit.git";

export const EXECUTABLE_MODE = 0o755;

/** The npx wrapper, which lists every platform package as an optional dependency at the release version. */
export const WRAPPER_PACKAGE_JSON = "apps/npx/package.json";

/** The Cargo package whose version every binary reports and the platform packages are published at. */
export const RUNNER_CRATE = "usemcpkit-runner";
