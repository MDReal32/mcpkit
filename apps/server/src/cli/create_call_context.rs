use crate::browser::{CREDENTIALS_FORM_PAGE, announce_authorization_url, announce_credentials_form_url};
use std::rc::Rc;
use usemcpkit_auth::secret_file::FileSecretStore;
use usemcpkit_auth::{AuthContext, AuthState};
use usemcpkit_core::env::Env;
use usemcpkit_core::home::resolve_env_home_dir;
use usemcpkit_credentials_form::{CREDENTIALS_FORM_TIMEOUT, CredentialsFormOptions, create_credentials_form};
use usemcpkit_execution::{CallContext, DEFAULT_TIMEOUT, ExecutorState};
use usemcpkit_http::ReqwestClient;

/// What every tool call of this server process shares: one HTTP client, the saved secrets, and one auth and executor
/// state, so a refresh, a sign-in or a credentials form runs once and the auth that worked is tried first.
pub fn create_call_context() -> Result<CallContext, String> {
    let env = Env::from_process();
    let home = resolve_env_home_dir(&env)?;
    let window_home = home.clone();
    let http = ReqwestClient::new().map_err(|error| error.0)?;
    let request_credentials = create_credentials_form(CredentialsFormOptions {
        page: Rc::from(CREDENTIALS_FORM_PAGE),
        on_url: Rc::new(move |url, request| announce_credentials_form_url(&window_home, url, request)),
        timeout: CREDENTIALS_FORM_TIMEOUT,
        env: env.clone(),
    });
    let project_dir = std::env::current_dir().map_err(|error| format!("cannot read the working directory: {error}"))?;
    Ok(CallContext {
        auth: AuthContext {
            env,
            home: home.clone(),
            http: Rc::new(http),
            on_authorization_url: Some(Rc::new(announce_authorization_url)),
            project_dir: Some(project_dir),
            request_credentials: Some(request_credentials),
            secret_store: Some(Rc::new(FileSecretStore::new(home))),
            state: Rc::new(AuthState::default()),
        },
        timeout: DEFAULT_TIMEOUT,
        state: Rc::new(ExecutorState::default()),
    })
}
