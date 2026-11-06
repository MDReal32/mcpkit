use serde_json::Value;

/// What answering one input line gives: the response to write, none for a notification or a blank line.
pub struct HandledLine {
    pub response: Option<Value>,
}
