use std::path::Path;
use std::rc::Rc;
use usemcpkit_auth::{AuthContext, AuthState};
use usemcpkit_core::env::Env;
use usemcpkit_execution::{CallContext, DEFAULT_TIMEOUT, ExecutorState};
use usemcpkit_http::HttpClient;

/// The tool-call context of a server process, with no browser, no project and no saved secrets.
pub fn call_context(home: &Path, env: &[(&str, &str)], http: Rc<dyn HttpClient>) -> CallContext {
    CallContext {
        auth: AuthContext {
            env: Env::from_pairs(env.iter().copied()),
            home: home.to_path_buf(),
            http,
            on_authorization_url: None,
            project_dir: None,
            request_credentials: None,
            secret_store: None,
            state: Rc::new(AuthState::default()),
        },
        timeout: DEFAULT_TIMEOUT,
        state: Rc::new(ExecutorState::default()),
    }
}
