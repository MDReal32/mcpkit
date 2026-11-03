use crate::browser::announce_authorization_url;
use mcpkit_auth::secret_file::FileSecretStore;
use mcpkit_auth::{AuthContext, AuthState};
use mcpkit_core::env::Env;
use mcpkit_core::home::resolve_env_home_dir;
use mcpkit_execution::{CallContext, DEFAULT_TIMEOUT, ExecutorState};
use mcpkit_http::ReqwestClient;
use std::rc::Rc;

/// What every tool call of this server process shares: one HTTP client, the saved secrets, and one auth and executor
/// state, so a refresh or a sign-in runs once and the auth that worked is tried first.
pub fn create_call_context() -> Result<CallContext, String> {
    let env = Env::from_process();
    let home = resolve_env_home_dir(&env)?;
    let http = ReqwestClient::new().map_err(|error| error.0)?;
    let project_dir = std::env::current_dir().map_err(|error| format!("cannot read the working directory: {error}"))?;
    Ok(CallContext {
        auth: AuthContext {
            env,
            home: home.clone(),
            http: Rc::new(http),
            on_authorization_url: Some(Rc::new(announce_authorization_url)),
            project_dir: Some(project_dir),
            secret_store: Some(Rc::new(FileSecretStore::new(home))),
            state: Rc::new(AuthState::default()),
        },
        timeout: DEFAULT_TIMEOUT,
        state: Rc::new(ExecutorState::default()),
    })
}
