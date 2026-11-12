use crate::OpenApiError;
use crate::consts::SCALAR_TYPES;
use crate::document::SpecDocument;
use crate::schema::pick_type::pick_type;
use crate::schema::resolve_schema::resolve_schema;
use serde_json::Value;

/// A query array of scalars sent as one repeated key per item.
pub fn is_exploded_scalar_array<'a>(
    document: &SpecDocument<'a>,
    schema: &'a Value,
    explode: Option<bool>,
) -> Result<bool, OpenApiError> {
    if schema.get("type").and_then(Value::as_str) != Some("array") || explode == Some(false) {
        return Ok(false);
    }
    let Some(items) = schema.get("items") else {
        return Ok(false);
    };
    let item_type = resolve_schema(document, items, &[])?
        .and_then(Value::as_object)
        .and_then(pick_type);
    Ok(item_type.is_some_and(|kind| SCALAR_TYPES.contains(&kind)))
}
