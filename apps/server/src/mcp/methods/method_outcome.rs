use serde_json::Value;

/// A method's result, and whether answering it grew the tool list so the client must be told after the response.
pub struct MethodOutcome {
    pub result: Value,
    pub tools_changed: bool,
}

impl MethodOutcome {
    pub fn unchanged(result: Value) -> Self {
        MethodOutcome {
            result,
            tools_changed: false,
        }
    }
}
