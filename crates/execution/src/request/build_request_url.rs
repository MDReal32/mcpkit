use crate::ToolError;
use indexmap::IndexMap;
use mcpkit_core::js::to_js_string;
use serde_json::Value;
use url::Url;

/// The base URL without one trailing slash, the path, then the query: an array repeats its key per item unless the key
/// is comma joined, which sends `String(array)`.
pub fn build_request_url(
    base_url: &str,
    path: &str,
    params: &IndexMap<String, Value>,
    comma_keys: &[String],
) -> Result<String, ToolError> {
    let base = base_url.strip_suffix('/').unwrap_or(base_url);
    let mut url = Url::parse(&format!("{base}{path}")).map_err(|_| ToolError::new("Invalid URL"))?;
    let mut pairs: Vec<(&str, String)> = Vec::new();
    for (key, value) in params {
        match value {
            Value::Array(items) if !comma_keys.contains(key) => {
                pairs.extend(items.iter().map(|item| (key.as_str(), to_js_string(Some(item)))));
            }
            value => pairs.push((key.as_str(), to_js_string(Some(value)))),
        }
    }
    if !pairs.is_empty() {
        url.query_pairs_mut().extend_pairs(pairs);
    }
    Ok(url.to_string())
}

#[cfg(test)]
mod tests {
    use super::build_request_url;
    use indexmap::IndexMap;
    use serde_json::{Value, json};

    #[test]
    fn repeats_array_values_unless_the_key_is_comma_joined() {
        let params: IndexMap<String, Value> = [
            ("ids".to_owned(), json!(["1", "2"])),
            ("tags".to_owned(), json!(["a", "b"])),
            ("q".to_owned(), json!("x y*")),
            ("empty".to_owned(), json!([])),
        ]
        .into_iter()
        .collect();

        let url = build_request_url("https://api.example.com/", "/items", &params, &["tags".to_owned()]).unwrap();

        assert_eq!(url, "https://api.example.com/items?ids=1&ids=2&tags=a%2Cb&q=x+y*");
    }

    #[test]
    fn adds_no_query_when_nothing_is_sent() {
        let params: IndexMap<String, Value> = [("empty".to_owned(), json!([]))].into_iter().collect();

        assert_eq!(
            build_request_url("https://h", "/x", &params, &[]).unwrap(),
            "https://h/x"
        );
    }
}
