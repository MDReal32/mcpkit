use crate::tool::{FixedValue, HttpMethod, NameSelection};
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RequestSpec {
    pub method: HttpMethod,
    /// `{arg}` placeholders are replaced by URL-encoded argument values.
    pub path: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub query: Option<NameSelection>,
    /// Outgoing keys may be dotted paths such as `fields.project.key` or `ancestors.0.id` to build nested JSON.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub body: Option<NameSelection>,
    /// Names the argument sent unchanged as the whole JSON body; excludes `body` and `fixed_body`.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub body_arg: Option<String>,
    /// Defaults to `application/json`; `text/*` sends `body_arg` as text, `multipart/form-data` sends form parts.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub content_type: Option<String>,
    /// Outgoing query keys whose array values are joined with commas; other arrays repeat the key once per item.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub comma_query: Option<Vec<String>>,
    /// Arguments holding a local file path or an array of them.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub file_args: Option<Vec<String>>,
    /// Names the argument holding the local path a successful response is saved to, instead of being returned.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub save_to_arg: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub fixed_query: Option<IndexMap<String, FixedValue>>,
    /// Header values sent on every call; auth headers win over them.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub fixed_headers: Option<IndexMap<String, String>>,
    /// Dotted paths like `body`; an argument with the same key wins.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub fixed_body: Option<IndexMap<String, FixedValue>>,
}
