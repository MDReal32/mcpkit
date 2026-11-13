use crate::Applies;
use crate::auth::{BasicAuth, BearerAuth, HeaderAuth, OAuthAuth, QueryAuth};
use crate::ui::UiSpec;
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

    /// What the credentials form calls a fallback entry instead of its auth type and env vars.
    pub fn label(&self) -> Option<&str> {
        match self {
            AuthSpec::Bearer(auth) => auth.label.as_deref(),
            AuthSpec::Header(auth) => auth.label.as_deref(),
            AuthSpec::Query(auth) => auth.label.as_deref(),
            AuthSpec::Basic(auth) => auth.label.as_deref(),
            AuthSpec::None | AuthSpec::OAuth(_) => None,
        }
    }

    /// The credentials form overrides of a fallback entry.
    pub fn ui(&self) -> Option<&UiSpec> {
        match self {
            AuthSpec::Bearer(auth) => auth.ui.as_ref(),
            AuthSpec::Header(auth) => auth.ui.as_ref(),
            AuthSpec::Query(auth) => auth.ui.as_ref(),
            AuthSpec::Basic(auth) => auth.ui.as_ref(),
            AuthSpec::None | AuthSpec::OAuth(_) => None,
        }
    }

    /// Where the credentials form offers a fallback entry; everywhere when absent.
    pub fn applies(&self) -> Option<&Applies> {
        match self {
            AuthSpec::Bearer(auth) => auth.applies.as_ref(),
            AuthSpec::Header(auth) => auth.applies.as_ref(),
            AuthSpec::Query(auth) => auth.applies.as_ref(),
            AuthSpec::Basic(auth) => auth.applies.as_ref(),
            AuthSpec::None | AuthSpec::OAuth(_) => None,
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
