/// The runner, the binary AI clients start.
pub const BINARY_NAME: &str = "usemcpkit";

/// The MCP server the runner runs from the same folder.
pub const SERVER_BINARY_NAME: &str = "usemcpkit-servers";

/// Each target is published as `@usemcpkit/cli-<target>` holding `bin/usemcpkit[.exe]` and `bin/usemcpkit-servers[.exe]`.
pub const PLATFORM_PACKAGE_PREFIX: &str = "@usemcpkit/cli-";

pub const PLATFORM_PACKAGE_BIN_DIR: &str = "bin";
