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

/// What Windows tries when `PATHEXT` is not set.
pub const WINDOWS_DEFAULT_PATH_EXTENSIONS: &str = ".COM;.EXE;.BAT;.CMD";

pub const CANNOT_IMPORT_MESSAGE: &str = "this credential cannot be fetched automatically";
