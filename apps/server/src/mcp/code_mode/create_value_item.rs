use crate::mcp::code_mode::print_value::print_value;
use crate::mcp::code_mode::truncate_output::truncate_output;
use crate::mcp::tools::create_text_content;
use serde_json::Value;

/// The `text` content item for one returned value, cut at the output limit.
pub fn create_value_item(value: &Value) -> Value {
    create_text_content(&truncate_output(print_value(value)))
}
