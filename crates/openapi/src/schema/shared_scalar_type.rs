use crate::OpenApiError;
use crate::document::SpecDocument;
use crate::schema::Conversion;
use crate::schema::pick_type::pick_type;
use crate::schema::resolve_schema::resolve_schema;
use serde_json::{Map, Value};

/// The type every `oneOf`/`anyOf` variant shares; with mixed types, `string` when widening is on and one is a string.
pub fn shared_scalar_type<'a>(
    document: &SpecDocument<'a>,
    schema: &'a Map<String, Value>,
    conversion: &Conversion,
    chain: &[String],
) -> Result<Option<String>, OpenApiError> {
    let mut types: Vec<Option<String>> = Vec::new();
    for key in ["oneOf", "anyOf"] {
        for variant in schema.get(key).and_then(Value::as_array).into_iter().flatten() {
            let resolved = resolve_schema(document, variant, chain)?.and_then(Value::as_object);
            types.push(resolved.and_then(pick_type).map(str::to_owned));
        }
    }
    let Some(first) = types.first().cloned() else {
        return Ok(None);
    };
    if types.iter().all(|kind| *kind == first) {
        return Ok(first);
    }
    let has_string = types.iter().any(|kind| kind.as_deref() == Some("string"));
    Ok((conversion.widen_mixed_scalars && has_string).then(|| "string".to_owned()))
}
