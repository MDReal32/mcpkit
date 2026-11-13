use std::time::Duration;

pub const FORM_HOST: &str = "127.0.0.1";

pub const MAX_BODY_BYTES: usize = 64 * 1024;

pub const CREDENTIALS_FORM_TIMEOUT: Duration = Duration::from_secs(5 * 60);

/// How long the open connections get to finish their response once the form has its answer.
pub const FORM_CLOSE_TIMEOUT: Duration = Duration::from_secs(2);

pub const FORM_CLOSED_MESSAGE: &str = "the credentials form was closed without an answer";

pub const FORM_TIMED_OUT_MESSAGE: &str = "the credentials form timed out";

pub const CLI_TOKEN_TIMEOUT: Duration = Duration::from_secs(15);

/// Stands in for the token while the import request is validated, before the CLI runs.
pub const PENDING_TOKEN_VALUE: &str = "pending";

pub const CANNOT_IMPORT_MESSAGE: &str = "this credential cannot be fetched automatically";

/// The origins a page of the credentials window app (`usemcpkit-window`) has: Tauri serves it from `tauri://localhost`
/// on macOS and Linux and from `tauri.localhost` on Windows. Only these may call the form API from another origin.
pub const WINDOW_APP_ORIGINS: [&str; 3] = ["tauri://localhost", "http://tauri.localhost", "https://tauri.localhost"];

/// How long a browser may reuse the answer to a preflight request.
pub const PREFLIGHT_MAX_AGE_SECONDS: &str = "600";

/// How long the Check button waits for the server to say its version.
pub const VERSION_CHECK_TIMEOUT: Duration = Duration::from_secs(15);

pub const REFUSED_CHECK_MESSAGE: &str = "the server refused the check; fill in the credentials and check again";
