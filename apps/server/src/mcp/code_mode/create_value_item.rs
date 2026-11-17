use crate::mcp::code_mode::consts::MAX_OUTPUT_CHARS;
use crate::mcp::code_mode::truncate_output::truncate_output;
use crate::mcp::tools::create_text_content;
use serde_json::{Value, json};
use usemcpkit_core::js::to_js_json_pretty;

/// The content item for one returned value: a string as `text`, any other value as a `json` item holding the value
/// itself. A value whose JSON is longer than the output limit is cut as `text`, since JSON cannot be cut.
pub fn create_value_item(value: Value) -> Value {
    if let Value::String(text) = value {
        return create_text_content(&truncate_output(text));
    }
    let printed = to_js_json_pretty(&value);
    if printed.chars().count() > MAX_OUTPUT_CHARS {
        return create_text_content(&truncate_output(printed));
    }
    json!({ "type": "json", "json": value })
}
