/** Each target's binaries are published as `@usemcpkit/cli-<target>`, holding `bin/usemcpkit[.exe]`. */
export const PLATFORM_PACKAGE_PREFIX = "@usemcpkit/cli-";

export const RUNNER_BINARY_PATH = "bin/usemcpkit";

/** Exit code when no binary is installed for this machine. */
export const EXIT_NO_BINARY = 1;
