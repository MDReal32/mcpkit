use serde_json::Value;

/// What answering one input line gives: the response to write, none for a notification or a blank line, and whether
/// the `tools/list_changed` notice follows it.
pub struct HandledLine {
    pub response: Option<Value>,
    pub tools_changed: bool,
}
