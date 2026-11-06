/// The registry `packages/servers` built, compiled in by `build.rs`: each file's path inside the folder and its text.
pub static REGISTRY_FILES: &[(&str, &str)] = include!(concat!(env!("OUT_DIR"), "/registry_files.rs"));

/// The server's credentials window, which it opens by running its own binary.
pub const WINDOW_COMMAND: &str = "window";

pub const SERVE_COMMAND: &str = "serve";

/// The runner starts its server as `serve <servers> --worker`.
pub const WORKER_FLAG: &str = "--worker";
