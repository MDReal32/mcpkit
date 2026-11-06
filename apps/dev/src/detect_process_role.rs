use crate::consts::{SERVE_COMMAND, WINDOW_COMMAND, WORKER_FLAG};
use crate::process_role::ProcessRole;
use std::ffi::OsString;

/// The server is what the runner starts (`serve <servers> --worker`) and the window the server opens (`window <url>`);
/// anything else is the runner.
pub fn detect_process_role(args: &[OsString]) -> ProcessRole {
    let command = args.get(1).and_then(|arg| arg.to_str());
    let is_worker = args.iter().skip(2).any(|arg| arg == WORKER_FLAG);
    match command {
        Some(WINDOW_COMMAND) => ProcessRole::Server,
        Some(SERVE_COMMAND) if is_worker => ProcessRole::Server,
        _ => ProcessRole::Runner,
    }
}

#[cfg(test)]
mod tests {
    use super::detect_process_role;
    use crate::process_role::ProcessRole;
    use std::ffi::OsString;

    fn role(args: &[&str]) -> ProcessRole {
        let args: Vec<OsString> = args.iter().map(OsString::from).collect();
        detect_process_role(&args)
    }

    #[test]
    fn runs_the_server_for_a_worker_or_a_window_and_the_runner_otherwise() {
        assert_eq!(
            role(&["usemcpkit", "serve", "git:github", "--worker"]),
            ProcessRole::Server
        );
        assert_eq!(
            role(&["usemcpkit", "window", "http://127.0.0.1:1/"]),
            ProcessRole::Server
        );
        assert_eq!(role(&["usemcpkit", "serve", "git:github"]), ProcessRole::Runner);
        assert_eq!(role(&["usemcpkit", "install", "--all"]), ProcessRole::Runner);
        assert_eq!(role(&["usemcpkit"]), ProcessRole::Runner);
    }
}
