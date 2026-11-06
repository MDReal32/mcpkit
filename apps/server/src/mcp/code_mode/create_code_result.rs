use crate::mcp::code_mode::code_run::CodeRun;
use crate::mcp::code_mode::consts::{CONSOLE_HEADING, NO_RETURN_VALUE, RESULT_HEADING};
use crate::mcp::code_mode::format_returned_json::format_returned_json;
use crate::mcp::code_mode::truncate_output::truncate_output;
use crate::mcp::tools::create_text_result;
use serde_json::Value;

/// The MCP result of a run: the console lines, then what the function returned as pretty JSON or the error it threw,
/// cut to the output limit. A thrown error is an `isError` result.
pub fn create_code_result(run: CodeRun) -> Value {
    let (text, is_error) = match run.result {
        Ok(Some(json)) => (format_returned_json(&json), false),
        Ok(None) => (NO_RETURN_VALUE.to_owned(), false),
        Err(error) => (error, true),
    };
    let output = if run.logs.is_empty() {
        text
    } else {
        format!("{CONSOLE_HEADING}\n{}\n\n{RESULT_HEADING}\n{text}", run.logs.join("\n"))
    };
    create_text_result(&truncate_output(output), is_error)
}
