use serde_json::Value;

pub fn describe_tool_location(tool: &Value, index: usize) -> String {
    match tool.get("name").and_then(Value::as_str) {
        Some(name) => format!("tools[{index}] ({name})"),
        None => format!("tools[{index}]"),
    }
}
