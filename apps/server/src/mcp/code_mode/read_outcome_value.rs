use crate::mcp::code_mode::read_mcp_result::read_mcp_result;
use crate::mcp::tools::ToolOutcome;
use serde_json::Value;

/// The value `codemode.call` resolves to: a registry tool's JSON (`null` when its mapping found nothing), or what an
/// upstream result holds.
pub fn read_outcome_value(outcome: ToolOutcome) -> Result<Value, String> {
    match outcome {
        ToolOutcome::Json(value) => Ok(value.unwrap_or(Value::Null)),
        ToolOutcome::Mcp(result) => read_mcp_result(&result),
    }
}
