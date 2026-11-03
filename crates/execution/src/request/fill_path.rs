use crate::ToolError;
use crate::args::ToolArgs;
use crate::request::encode_uri_component::encode_uri_component;
use mcpkit_core::js::to_js_string;

/// Replaces each `{name}` of word characters with the URL-encoded argument; other braces stay as they are.
pub fn fill_path(template: &str, args: &ToolArgs) -> Result<String, ToolError> {
    let mut filled = String::with_capacity(template.len());
    let mut rest = template;
    while let Some(start) = rest.find('{') {
        filled.push_str(&rest[..start]);
        let after = &rest[start + 1..];
        let name_length = after
            .find(|character: char| !(character.is_ascii_alphanumeric() || character == '_'))
            .unwrap_or(after.len());
        if name_length == 0 || !after[name_length..].starts_with('}') {
            filled.push('{');
            rest = after;
            continue;
        }
        let name = &after[..name_length];
        let Some(value) = args.get(name) else {
            return Err(ToolError(format!("path parameter \"{name}\" not provided")));
        };
        filled.push_str(&encode_uri_component(&to_js_string(Some(&value.to_json()))));
        rest = &after[name_length + 1..];
    }
    filled.push_str(rest);
    Ok(filled)
}

#[cfg(test)]
mod tests {
    use super::fill_path;
    use crate::args::{ArgValue, ToolArgs};
    use serde_json::json;

    #[test]
    fn fills_word_placeholders_and_leaves_other_braces() {
        let args: ToolArgs = [("id".to_owned(), ArgValue::Json(json!("a b")))].into_iter().collect();

        assert_eq!(fill_path("/x/{id}/{ }/{a-b}{", &args).unwrap(), "/x/a%20b/{ }/{a-b}{");
        assert_eq!(
            fill_path("/x/{other}", &args).unwrap_err().0,
            "path parameter \"other\" not provided"
        );
    }
}
