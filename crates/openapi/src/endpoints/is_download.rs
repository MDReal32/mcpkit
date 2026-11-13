use crate::endpoints::Endpoint;
use crate::endpoints::is_readable_type::is_readable_type;
use crate::schema::Conversion;
use serde_json::Value;

/// A GET whose answer is a file to save: its path matches `downloadPaths`, or its first success response has content
/// and none of it is readable text.
pub fn is_download(endpoint: &Endpoint, conversion: &Conversion) -> bool {
    if endpoint.method != "get" {
        return false;
    }
    if conversion
        .download_paths
        .iter()
        .any(|pattern| pattern.is_match(&endpoint.path))
    {
        return true;
    }
    let success = endpoint
        .operation
        .get("responses")
        .and_then(Value::as_object)
        .and_then(|responses| responses.iter().find(|(status, _)| status.starts_with('2')))
        .map(|(_, response)| response);
    let types: Vec<&String> = success
        .and_then(|response| response.get("content"))
        .and_then(Value::as_object)
        .map(|content| content.keys().collect())
        .unwrap_or_default();
    !types.is_empty() && !types.iter().any(|content_type| is_readable_type(content_type))
}
