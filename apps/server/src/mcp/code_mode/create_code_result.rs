use crate::mcp::code_mode::code_run::CodeRun;
use crate::mcp::code_mode::consts::{CONSOLE_HEADING, NO_RETURN_VALUE};
use crate::mcp::code_mode::create_returned_content::create_returned_content;
use crate::mcp::code_mode::create_structured_content::create_structured_content;
use crate::mcp::code_mode::truncate_output::truncate_output;
use crate::mcp::tools::create_text_content;
use serde_json::{Value, json};

/// The MCP result of a run: `content` holds only `text` items, as MCP clients validate it, the console lines first, then
/// what the function returned (one item, or one per element of an array, see `create_returned_content`) or the error it
/// threw. The returned value itself is also in `structuredContent` (see `create_structured_content`). A thrown error is
/// an `isError` result.
pub fn create_code_result(run: CodeRun) -> Value {
    let mut content = Vec::new();
    if !run.logs.is_empty() {
        let console = format!("{CONSOLE_HEADING}\n{}", run.logs.join("\n"));
        content.push(create_text_content(&truncate_output(console)));
    }
    let is_error = run.result.is_err();
    let mut structured_content = None;
    match run.result {
        Ok(Some(json)) => {
            structured_content = create_structured_content(&json);
            content.extend(create_returned_content(&json));
        }
        Ok(None) => content.push(create_text_content(NO_RETURN_VALUE)),
        Err(error) => content.push(create_text_content(&truncate_output(error))),
    }
    let mut result = json!({ "content": content });
    if let Some(structured) = structured_content {
        result["structuredContent"] = structured;
    }
    if is_error {
        result["isError"] = json!(true);
    }
    result
}

#[cfg(test)]
mod tests {
    use super::create_code_result;
    use crate::mcp::code_mode::code_run::CodeRun;
    use serde_json::json;

    #[test]
    fn puts_the_console_before_the_returned_value_and_adds_structured_content() {
        let result = create_code_result(CodeRun {
            result: Ok(Some(r#"{"a":1}"#.to_owned())),
            logs: vec!["one".to_owned()],
        });
        assert_eq!(
            result,
            json!({
                "content": [
                    { "type": "text", "text": "--- console ---\none" },
                    { "type": "text", "text": "{\n  \"a\": 1\n}" },
                ],
                "structuredContent": { "result": { "a": 1 } },
            })
        );
    }

    #[test]
    fn marks_a_thrown_error_as_a_text_item_with_is_error() {
        let result = create_code_result(CodeRun {
            result: Err("boom".to_owned()),
            logs: Vec::new(),
        });
        assert_eq!(
            result,
            json!({ "content": [{ "type": "text", "text": "boom" }], "isError": true })
        );
    }
}
