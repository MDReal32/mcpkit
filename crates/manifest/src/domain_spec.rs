use serde::{Deserialize, Serialize};

/// Lets one server talk to any host of the same API, for example a self-hosted GitHub Enterprise.
#[derive(Clone, Debug, Default, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DomainSpec {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub label: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub hint: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub placeholder: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub default: Option<String>,
    /// Env var that sets the domain; when it is set the form does not ask for one.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub env: Option<String>,
    /// Picks the saved host the git remote of the working directory points at.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub match_git_remote: Option<bool>,
    /// Hosts the domain field offers besides the saved ones; offering one does not pick it.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub suggested_hosts: Option<Vec<String>>,
    /// Reaches a `localhost` or `127.0.0.1` domain over `http://`, for servers that usually run locally without TLS.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub loopback_http: Option<bool>,
    /// Puts a Check button after the host field of the credentials form, which asks the server its version when the
    /// OpenAPI source matching the host has a version probe.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub check: Option<bool>,
}

impl DomainSpec {
    pub fn allows_loopback_http(&self) -> bool {
        self.loopback_http == Some(true)
    }

    pub fn offers_check(&self) -> bool {
        self.check == Some(true)
    }
}
