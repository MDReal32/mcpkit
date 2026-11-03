use crate::ToolError;
use crate::request::apply_input_defaults::apply_input_defaults;
use crate::request::assert_required_args::assert_required_args;
use mcpkit_manifest::tool::ToolSpec;
use serde_json::{Map, Value};

pub fn prepare_tool_args(tool: &ToolSpec, raw: Option<&Map<String, Value>>) -> Result<Map<String, Value>, ToolError> {
    let args = apply_input_defaults(&tool.input, raw);
    assert_required_args(&tool.input, &args)?;
    Ok(args)
}
