use crate::oauth::AuthorizationUrlHandler;
use crate::{AuthState, SecretStore};
use mcpkit_core::env::Env;
use mcpkit_http::HttpClient;
use std::path::PathBuf;
use std::rc::Rc;

/// What resolving a call's auth reads from: its variables, the mcpkit home, the network and the user's project.
#[derive(Clone)]
pub struct AuthContext {
    pub env: Env,
    /// The folder `config.json` and `tokens.json` live in.
    pub home: PathBuf,
    pub http: Rc<dyn HttpClient>,
    /// Shows the user the URL of a browser sign-in; without it, OAuth2 entries that need one are rejected.
    pub on_authorization_url: Option<AuthorizationUrlHandler>,
    /// The directory the calling client works in; it picks the host of a server used on several hosts.
    pub project_dir: Option<PathBuf>,
    /// Credentials saved from the credentials form; env vars win over them.
    pub secret_store: Option<Rc<dyn SecretStore>>,
    pub state: Rc<AuthState>,
}
