use crate::tool::FixedValue;
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

/// How endpoints become tools; every field falls back to its default when absent.
#[derive(Clone, Debug, Default, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ConversionOptions {
    /// Object properties below this depth are dropped (3 by default).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub max_depth: Option<u32>,
    /// Puts the primitive `default` of a schema into the input (on by default).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub include_defaults: Option<bool>,
    /// Removes `**` from descriptions.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub strip_bold: Option<bool>,
    /// A oneOf/anyOf of mixed scalar types becomes `string` when one of them is a string.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub widen_mixed_scalars: Option<bool>,
    /// An exploded query array of scalars stays an array argument; otherwise it is a comma-separated string.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub keeps_exploded_arrays: Option<bool>,
    /// Put before every tool description, for example `[Data Center]`.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub description_prefix: Option<String>,
    /// Regexes over the path of GET endpoints whose answer is a file to save rather than read.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub download_paths: Option<Vec<String>>,
    /// The form part a multipart body that is a bare file list is sent as.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub file_part_name: Option<String>,
    /// Regexes over `"METHOD /path"` of endpoints left out.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub skip: Option<Vec<String>>,
    /// Leaves out deprecated endpoints.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub skip_deprecated: Option<bool>,
    /// Security schemes the manifest's auth satisfies; an endpoint whose `security` names only other schemes is left out.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub security: Option<Vec<String>>,
    /// Query values sent on every call.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub fixed_query: Option<IndexMap<String, FixedValue>>,
}
