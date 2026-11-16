use crate::OpenApiError;
use crate::consts::COMMA_SEPARATED_SUFFIX;
use crate::document::SpecDocument;
use crate::endpoints::Parameter;
use crate::schema::Conversion;
use crate::schema::clean_description::clean_description;
use crate::schema::convert_schema::convert_schema;
use crate::schema::is_exploded_scalar_array::is_exploded_scalar_array;
use crate::schema::resolve_schema::resolve_schema;
use serde_json::{Map, Value};

/// The argument schema of a path or query parameter: an array becomes one comma-separated string unless the source
/// keeps exploded scalar arrays; the parameter's description wins over its schema's.
pub fn build_parameter_schema<'a>(
    document: &SpecDocument<'a>,
    parameter: &Parameter<'a>,
    conversion: &Conversion,
) -> Result<Map<String, Value>, OpenApiError> {
    let empty = Value::Object(Map::new());
    let schema = match parameter.schema {
        Some(schema) => resolve_schema(document, schema, &[])?.unwrap_or(&empty),
        None => &empty,
    };
    let own_description = parameter.description.as_deref();
    let description = clean_description(
        own_description.or_else(|| schema.get("description").and_then(Value::as_str)),
        conversion.strip_bold,
    );
    let keeps_array =
        conversion.keeps_exploded_arrays && is_exploded_scalar_array(document, schema, parameter.explode)?;
    if schema.get("type").and_then(Value::as_str) == Some("array") && !keeps_array {
        let text = if description.is_empty() {
            COMMA_SEPARATED_SUFFIX.to_owned()
        } else {
            format!("{description} {COMMA_SEPARATED_SUFFIX}")
        };
        let mut converted = Map::new();
        converted.insert("type".to_owned(), Value::String("string".to_owned()));
        converted.insert("description".to_owned(), Value::String(text));
        return Ok(converted);
    }
    let mut converted = convert_schema(document, schema, conversion, 0, &mut Vec::new())?;
    if !description.is_empty() {
        converted.insert("description".to_owned(), Value::String(description));
    }
    Ok(converted)
}
