use crate::consts::DEPRECATED_LABEL;
use crate::endpoints::Endpoint;
use crate::schema::{Conversion, clean_description};
use serde_json::Value;

/// `<summary>. <first paragraph of the description>`, after the source's prefix and `[Deprecated]` when it applies.
pub fn describe_endpoint(endpoint: &Endpoint, conversion: &Conversion) -> String {
    let summary = endpoint
        .operation
        .get("summary")
        .and_then(Value::as_str)
        .unwrap_or_default()
        .trim();
    let summary = summary.strip_suffix('.').unwrap_or(summary);
    let detail = clean_description(
        endpoint.operation.get("description").and_then(Value::as_str),
        conversion.strip_bold,
    );
    let text = match (summary.is_empty(), detail.is_empty() || detail == summary) {
        (_, true) => summary.to_owned(),
        (true, false) => detail,
        (false, false) => format!("{summary}. {detail}"),
    };
    let deprecated = endpoint.operation.get("deprecated").and_then(Value::as_bool) == Some(true);
    let labels = conversion
        .description_prefix
        .iter()
        .map(String::as_str)
        .chain(deprecated.then_some(DEPRECATED_LABEL));
    labels
        .chain(std::iter::once(text.as_str()))
        .filter(|part| !part.is_empty())
        .collect::<Vec<_>>()
        .join(" ")
}
