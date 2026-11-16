use crate::OpenApiError;
use crate::document::SpecDocument;
use crate::schema::pick_type::pick_type;
use crate::schema::resolve_schema::resolve_schema;
use serde_json::Value;

/// Whether one of the schema's `allOf`/`oneOf`/`anyOf` variants describes an object.
pub fn has_object_variants<'a>(
    document: &SpecDocument<'a>,
    schema: &'a Value,
    chain: &[String],
) -> Result<bool, OpenApiError> {
    for key in ["allOf", "oneOf", "anyOf"] {
        for variant in schema.get(key).and_then(Value::as_array).into_iter().flatten() {
            let Some(Value::Object(resolved)) = resolve_schema(document, variant, chain)? else {
                continue;
            };
            if pick_type(resolved) == Some("object") || resolved.contains_key("properties") {
                return Ok(true);
            }
        }
    }
    Ok(false)
}
