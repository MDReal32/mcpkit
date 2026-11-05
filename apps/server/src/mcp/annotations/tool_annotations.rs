use serde::Serialize;

/// The hints a client uses to group tools: read-only ones apart from the ones that write or delete.
#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ToolAnnotations {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub read_only_hint: Option<bool>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub destructive_hint: Option<bool>,
}

impl ToolAnnotations {
    pub const READ_ONLY: ToolAnnotations = ToolAnnotations {
        read_only_hint: Some(true),
        destructive_hint: None,
    };

    pub const DESTRUCTIVE: ToolAnnotations = ToolAnnotations {
        read_only_hint: Some(false),
        destructive_hint: Some(true),
    };

    pub const WRITES: ToolAnnotations = ToolAnnotations {
        read_only_hint: Some(false),
        destructive_hint: None,
    };
}
