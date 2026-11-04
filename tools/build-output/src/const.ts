import type { BuildCopy } from "./types/build-copy.ts";

/** The folder every build is collected in, relative to the workspace root. */
export const BUILD_OUTPUT_DIR = "build";

/** Each project's own build folder and the folder it is copied to under {@link BUILD_OUTPUT_DIR}. */
export const PROJECT_BUILDS: readonly BuildCopy[] = [
  { from: "apps/analytics/build", to: "analytics" },
  { from: "apps/npx/build", to: "npx" },
  { from: "packages/core/build", to: "core" },
  { from: "packages/servers/build", to: "servers" },
  { from: "packages/ui/build", to: "ui" },
];

/** The Rust release binaries, copied from Cargo's `target/release` to the top of {@link BUILD_OUTPUT_DIR}. */
export const RELEASE_BINARIES = ["usemcpkit", "usemcpkit-servers"] as const;

export const CARGO_RELEASE_DIR = "target/release";
