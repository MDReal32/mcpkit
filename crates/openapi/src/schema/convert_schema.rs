use crate::OpenApiError;
use crate::document::{SpecDocument, reference_of};
use crate::schema::Conversion;
use crate::schema::clean_description::clean_description;
use crate::schema::has_object_variants::has_object_variants;
use crate::schema::merge_variants::merge_variants;
use crate::schema::pick_type::pick_type;
use crate::schema::shared_scalar_type::shared_scalar_type;
use serde_json::{Map, Value};

/// An OpenAPI schema as the JSON schema of a tool argument: `type`, `description`, `default`, `enum`, `items`,
/// `properties` and `required` only. Object properties below `max_depth` are dropped, and a schema that refers back
/// to one being converted becomes `{}`.
pub fn convert_schema<'a>(
    document: &SpecDocument<'a>,
    node: &'a Value,
    conversion: &Conversion,
    depth: u32,
    chain: &mut Vec<String>,
) -> Result<Map<String, Value>, OpenApiError> {
    if let Some(reference) = reference_of(node) {
        if chain.iter().any(|seen| seen == reference) {
            return Ok(Map::new());
        }
        let target = document.pointer(reference)?;
        chain.push(reference.to_owned());
        let converted = convert_schema(document, target, conversion, depth, chain);
        chain.pop();
        return converted;
    }
    let empty = Map::new();
    let merged = if has_object_variants(document, node, chain)? {
        Some(merge_variants(document, node, chain)?)
    } else {
        None
    };
    let schema = match &merged {
        Some(merged) => merged,
        None => node.as_object().unwrap_or(&empty),
    };
    let properties = schema.get("properties").and_then(Value::as_object);
    let kind = match pick_type(schema) {
        Some(kind) => Some(kind.to_owned()),
        None if properties.is_some() => Some("object".to_owned()),
        None => shared_scalar_type(document, node.as_object().unwrap_or(&empty), conversion, chain)?,
    };
    let mut result = Map::new();
    if let Some(kind) = &kind {
        result.insert("type".to_owned(), Value::String(kind.clone()));
    }
    let description = clean_description(schema.get("description").and_then(Value::as_str), conversion.strip_bold);
    if !description.is_empty() {
        result.insert("description".to_owned(), Value::String(description));
    }
    if conversion.include_defaults
        && let Some(default) = schema
            .get("default")
            .filter(|value| value.is_string() || value.is_number() || value.is_boolean())
    {
        result.insert("default".to_owned(), default.clone());
    }
    let values: Vec<Value> = schema
        .get("enum")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .filter(|value| !value.is_null())
        .cloned()
        .collect();
    if !values.is_empty() {
        result.insert("enum".to_owned(), Value::Array(values));
    }
    if kind.as_deref() == Some("array")
        && let Some(items) = schema.get("items")
    {
        let items = convert_schema(document, items, conversion, depth + 1, chain)?;
        result.insert("items".to_owned(), Value::Object(items));
    }
    if kind.as_deref() == Some("object")
        && let Some(properties) = properties.filter(|properties| !properties.is_empty())
        && depth < conversion.max_depth
    {
        let mut converted = Map::new();
        for (name, property) in properties {
            let property = convert_schema(document, property, conversion, depth + 1, chain)?;
            converted.insert(name.clone(), Value::Object(property));
        }
        result.insert("properties".to_owned(), Value::Object(converted));
        let required: Vec<Value> = schema
            .get("required")
            .and_then(Value::as_array)
            .into_iter()
            .flatten()
            .filter(|name| name.as_str().is_some_and(|name| properties.contains_key(name)))
            .cloned()
            .collect();
        if !required.is_empty() {
            result.insert("required".to_owned(), Value::Array(required));
        }
    }
    Ok(result)
}
