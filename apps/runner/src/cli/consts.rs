/// Overrides where the runner finds the server binary it runs and watches.
pub const SERVER_BINARY_ENV: &str = "MCPKIT_SERVER";

pub const WORKER_FLAG: &str = "--worker";

pub const VERSION: &str = env!("CARGO_PKG_VERSION");

pub const EXIT_FAILURE: i32 = 1;
