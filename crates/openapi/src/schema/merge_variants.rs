use crate::OpenApiError;
use crate::document::SpecDocument;
use crate::schema::resolve_schema::resolve_schema;
use serde_json::{Map, Value};

fn required_of(schema: &Map<String, Value>) -> Vec<String> {
    schema
        .get("required")
        .and_then(Value::as_array)
        .map(|names| names.iter().filter_map(Value::as_str).map(str::to_owned).collect())
        .unwrap_or_default()
}

fn resolved_variants<'a>(
    document: &SpecDocument<'a>,
    schema: &'a Value,
    key: &str,
    chain: &[String],
) -> Result<Vec<Map<String, Value>>, OpenApiError> {
    let mut variants = Vec::new();
    for variant in schema.get(key).and_then(Value::as_array).into_iter().flatten() {
        let resolved = resolve_schema(document, variant, chain)?;
        variants.push(resolved.and_then(Value::as_object).cloned().unwrap_or_default());
    }
    Ok(variants)
}

/// Flattens `allOf` (all variants apply) and `oneOf`/`anyOf` (any may apply, so only what every alternative requires
/// is required) into one object schema; properties of later variants win.
pub fn merge_variants<'a>(
    document: &SpecDocument<'a>,
    schema: &'a Value,
    chain: &[String],
) -> Result<Map<String, Value>, OpenApiError> {
    let own = schema.as_object().cloned().unwrap_or_default();
    let all_of = resolved_variants(document, schema, "allOf", chain)?;
    let alternatives_key = if schema.get("oneOf").is_some() {
        "oneOf"
    } else {
        "anyOf"
    };
    let alternatives = resolved_variants(document, schema, alternatives_key, chain)?;
    let mut properties = Map::new();
    for part in std::iter::once(&own).chain(&all_of).chain(&alternatives) {
        for (name, property) in part.get("properties").and_then(Value::as_object).into_iter().flatten() {
            properties.insert(name.clone(), property.clone());
        }
    }
    let mut required: Vec<String> = Vec::new();
    for name in std::iter::once(&own).chain(&all_of).flat_map(required_of) {
        if !required.contains(&name) {
            required.push(name);
        }
    }
    let shared_by_alternatives = alternatives
        .iter()
        .map(required_of)
        .reduce(|shared, next| shared.into_iter().filter(|name| next.contains(name)).collect());
    for name in shared_by_alternatives.into_iter().flatten() {
        if !required.contains(&name) {
            required.push(name);
        }
    }
    let mut merged = own;
    merged.insert("properties".to_owned(), Value::Object(properties));
    merged.insert(
        "required".to_owned(),
        Value::Array(required.into_iter().map(Value::String).collect()),
    );
    Ok(merged)
}
