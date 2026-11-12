use crate::auth::AuthSpec;
use crate::openapi::OpenApiSpec;
use crate::tool::ToolSpec;
use crate::ui::UiSpec;
use crate::upstream::UpstreamSpec;
use crate::{DomainSpec, EditionSpec};
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Manifest {
    pub name: String,
    /// Groups servers of one kind, for example `git`.
    pub category: String,
    pub version: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    /// May contain `{domain}`, as may the oauth URLs (`discovery` included) and an HTTP upstream's `url`; `domain` then
    /// says where the value comes from.
    pub base_url: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub domain: Option<DomainSpec>,
    /// Deployments picked by the domain's host; a domain matching none uses the tools' own requests.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub editions: Option<IndexMap<String, EditionSpec>>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub headers: Option<IndexMap<String, String>>,
    /// OAuth2 entries first, then fallbacks; tried top to bottom, the first that works is used.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub auth: Option<Vec<AuthSpec>>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub ui: Option<UiSpec>,
    /// Another MCP server this one fronts: its tools are discovered at runtime and listed beside the manifest's own
    /// `tools`, which may be empty. An HTTP upstream may have its own `auth`.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub upstream: Option<UpstreamSpec>,
    /// Tools built on the user's machine from the OpenAPI document of the server's version; the hand-written `tools`
    /// replace built ones of the same name where their `applies` says.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub openapi: Option<OpenApiSpec>,
    /// Empty in a shell, whose tools live in its parts.
    #[serde(default)]
    pub tools: Vec<ToolSpec>,
}

impl Manifest {
    pub fn id(&self) -> String {
        format!("{}:{}", self.category, self.name)
    }
}
