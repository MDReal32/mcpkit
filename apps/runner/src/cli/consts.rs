use std::time::Duration;

/// Overrides where the runner finds the server binary it runs and watches.
pub const SERVER_BINARY_ENV: &str = "USEMCPKIT_SERVER";

pub const WORKER_FLAG: &str = "--worker";

pub const ALL_FLAG: &str = "--all";

pub const CLIENTS_FLAG: &str = "--clients";

pub const BINARY_FLAG: &str = "--binary";

pub const AUTO_UPDATE_QUESTION: &str = "Keep usemcpkit up to date automatically? It schedules \"usemcpkit upgrade\" \
every few hours and lets a running usemcpkit update itself";

pub const VERSION: &str = env!("CARGO_PKG_VERSION");

pub const EXIT_SUCCESS: i32 = 0;

pub const EXIT_FAILURE: i32 = 1;

/// How often a running runner asks whether the update interval has passed; kept below it so a tick is never skipped.
pub const AUTO_UPDATE_RECHECK_INTERVAL: Duration = Duration::from_secs(60 * 60);

/// How long `--version` of the installed binary may take.
pub const VERSION_TIMEOUT: Duration = Duration::from_secs(10);
