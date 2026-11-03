use crate::auth::{BasicAuth, BearerAuth, HeaderAuth, OAuthAuth, QueryAuth};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(tag = "type", rename_all = "lowercase")]
pub enum AuthSpec {
    None,
    Bearer(BearerAuth),
    Header(HeaderAuth),
    Query(QueryAuth),
    Basic(BasicAuth),
    #[serde(rename = "oauth")]
    OAuth(OAuthAuth),
}

impl AuthSpec {
    /// The browser sign-in; every other entry is a fallback built from credential values.
    pub fn as_interactive(&self) -> Option<&OAuthAuth> {
        match self {
            AuthSpec::OAuth(auth) => Some(auth),
            _ => None,
        }
    }

    pub fn is_interactive(&self) -> bool {
        self.as_interactive().is_some()
    }

    /// The env vars that hold the entry's credentials, which are also their keys in the secret store.
    pub fn env_names(&self) -> Vec<&str> {
        match self {
            AuthSpec::None => Vec::new(),
            AuthSpec::Basic(auth) => vec![auth.username_env.as_str(), auth.password_env.as_str()],
            AuthSpec::OAuth(auth) => auth.client_secret_env.iter().map(String::as_str).collect(),
            AuthSpec::Bearer(BearerAuth { env, .. })
            | AuthSpec::Header(HeaderAuth { env, .. })
            | AuthSpec::Query(QueryAuth { env, .. }) => vec![env.as_str()],
        }
    }

    /// `oauth pkce` for the sign-in, the `type` otherwise.
    pub fn type_label(&self) -> &'static str {
        match self {
            AuthSpec::None => "none",
            AuthSpec::Bearer(_) => "bearer",
            AuthSpec::Header(_) => "header",
            AuthSpec::Query(_) => "query",
            AuthSpec::Basic(_) => "basic",
            AuthSpec::OAuth(_) => "oauth pkce",
        }
    }

    /// `bearer GITHUB_TOKEN`, `basic USER, PASSWORD`, `oauth pkce`, or `no auth`.
    pub fn describe(&self) -> String {
        if matches!(self, AuthSpec::None) {
            return "no auth".to_owned();
        }
        let names = self.env_names().join(", ");
        if names.is_empty() {
            return self.type_label().to_owned();
        }
        format!("{} {names}", self.type_label())
    }
}
