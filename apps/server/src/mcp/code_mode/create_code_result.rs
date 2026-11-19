use crate::mcp::code_mode::code_run::CodeRun;
use crate::mcp::code_mode::consts::CONSOLE_HEADING;
use crate::mcp::code_mode::create_structured_content::create_structured_content;
use crate::mcp::code_mode::truncate_output::truncate_output;
use crate::mcp::consts::RESULT_TYPE_COMPLETE;
use crate::mcp::tools::create_text_content;
use serde_json::{Value, json};

/// The MCP `CallToolResult` of a run, `resultType` `complete`. What the function returned lives only in `structuredContent`, exactly as returned (see
/// `create_structured_content`), and is never repeated in `content`; a function that returns nothing has none.
/// `content` holds only `text` items, as MCP clients validate it: the console lines, and a thrown error, which makes it
/// an `isError` result.
pub fn create_code_result(run: CodeRun) -> Value {
    let mut content = Vec::new();
    if !run.logs.is_empty() {
        let console = format!("{CONSOLE_HEADING}\n{}", run.logs.join("\n"));
        content.push(create_text_content(&truncate_output(console)));
    }
    let mut result = json!({ "content": [], "resultType": RESULT_TYPE_COMPLETE });
    match run.result {
        Ok(Some(json)) => result["structuredContent"] = create_structured_content(&json),
        Ok(None) => {}
        Err(error) => {
            content.push(create_text_content(&truncate_output(error)));
            result["isError"] = json!(true);
        }
    }
    result["content"] = Value::Array(content);
    result
}

#[cfg(test)]
mod tests {
    use super::create_code_result;
    use crate::mcp::code_mode::code_run::CodeRun;
    use serde_json::json;

    #[test]
    fn puts_a_returned_object_in_structured_content_only() {
        let result = create_code_result(CodeRun {
            result: Ok(Some(r#"{"a":1}"#.to_owned())),
            logs: vec!["one".to_owned()],
        });
        assert_eq!(
            result,
            json!({
                "content": [{ "type": "text", "text": "--- console ---\none" }],
                "resultType": "complete",
                "structuredContent": { "a": 1 },
            })
        );
    }

    #[test]
    fn puts_a_returned_array_in_structured_content_as_it_is() {
        let result = create_code_result(CodeRun {
            result: Ok(Some(r#"["a",{"b":1}]"#.to_owned())),
            logs: Vec::new(),
        });
        assert_eq!(
            result,
            json!({ "content": [], "resultType": "complete", "structuredContent": ["a", { "b": 1 }] })
        );
    }

    #[test]
    fn has_no_structured_content_when_nothing_is_returned() {
        let result = create_code_result(CodeRun {
            result: Ok(None),
            logs: Vec::new(),
        });
        assert_eq!(result, json!({ "content": [], "resultType": "complete" }));
    }

    #[test]
    fn marks_a_thrown_error_as_a_text_item_with_is_error() {
        let result = create_code_result(CodeRun {
            result: Err("boom".to_owned()),
            logs: Vec::new(),
        });
        assert_eq!(
            result,
            json!({ "content": [{ "type": "text", "text": "boom" }], "isError": true, "resultType": "complete" })
        );
    }
}
