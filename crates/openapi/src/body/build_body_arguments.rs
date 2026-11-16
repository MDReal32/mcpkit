use crate::OpenApiError;
use crate::body::BodyArguments;
use crate::body::is_file_list_body::is_file_list_body;
use crate::body::select_body_content::select_body_content;
use crate::body::with_file_description::with_file_description;
use crate::consts::{BODY_PREFIX, FILES_ARGUMENT_DESCRIPTION, MULTIPART_CONTENT_TYPE, WHOLE_BODY_ARGUMENT};
use crate::document::SpecDocument;
use crate::schema::{Conversion, convert_schema, is_binary_schema, resolve_schema};
use crate::tool::ArgumentNames;
use indexmap::IndexMap;
use serde_json::{Map, Value, json};

/// The arguments of a request body: a file list, one whole-body argument when the schema names no properties, or one
/// argument per top-level property.
pub fn build_body_arguments(
    document: &SpecDocument,
    request_body: &Value,
    names: &mut ArgumentNames,
    conversion: &Conversion,
) -> Result<Option<BodyArguments>, OpenApiError> {
    let request_body = document.resolve(request_body)?;
    let Some(content) = request_body.get("content").and_then(Value::as_object) else {
        return Ok(None);
    };
    let Some(selected) = select_body_content(content) else {
        return Ok(None);
    };
    let body_required = request_body.get("required").and_then(Value::as_bool) == Some(true);
    let mut arguments = BodyArguments {
        mapping: IndexMap::new(),
        properties: Map::new(),
        required: Vec::new(),
        content_type: selected.content_type.clone(),
        file_args: Vec::new(),
        whole_body: None,
    };
    if let (true, Some(part_name)) = (is_file_list_body(document, &selected)?, &conversion.file_part_name) {
        let argument = names.claim(part_name, BODY_PREFIX);
        arguments.mapping.insert(part_name.clone(), argument.clone());
        arguments.properties.insert(
            argument.clone(),
            json!({ "type": "array", "items": { "type": "string" }, "description": FILES_ARGUMENT_DESCRIPTION }),
        );
        if body_required {
            arguments.required.push(argument.clone());
        }
        arguments.file_args.push(argument);
        return Ok(Some(arguments));
    }
    let node = selected.schema.node();
    let converted = convert_schema(document, node, conversion, 0, &mut Vec::new())?;
    let properties = converted
        .get("properties")
        .and_then(Value::as_object)
        .filter(|found| !found.is_empty());
    let Some(properties) = properties else {
        let argument = names.claim(WHOLE_BODY_ARGUMENT, BODY_PREFIX);
        let raw = resolve_schema(document, node, &[])?;
        let is_file = is_binary_schema(raw);
        let schema = if is_file {
            with_file_description(converted)
        } else {
            Value::Object(converted)
        };
        arguments.properties.insert(argument.clone(), schema);
        if body_required {
            arguments.required.push(argument.clone());
        }
        if is_file {
            arguments.file_args.push(argument.clone());
        }
        arguments.whole_body = Some(argument);
        return Ok(Some(arguments));
    };
    let raw_properties = resolve_schema(document, node, &[])?
        .and_then(|schema| schema.get("properties"))
        .and_then(Value::as_object);
    let required: Vec<&str> = converted
        .get("required")
        .and_then(Value::as_array)
        .map(|names| names.iter().filter_map(Value::as_str).collect())
        .unwrap_or_default();
    for (key, property) in properties {
        let argument = names.claim(key, BODY_PREFIX);
        arguments.mapping.insert(key.clone(), argument.clone());
        let raw = match raw_properties.and_then(|raw| raw.get(key)) {
            Some(raw) => resolve_schema(document, raw, &[])?,
            None => None,
        };
        let is_file = selected.content_type == MULTIPART_CONTENT_TYPE && is_binary_schema(raw);
        let schema = match (is_file, property) {
            (true, Value::Object(fields)) => with_file_description(fields.clone()),
            _ => property.clone(),
        };
        arguments.properties.insert(argument.clone(), schema);
        if is_file {
            arguments.file_args.push(argument.clone());
        }
        if required.contains(&key.as_str()) {
            arguments.required.push(argument);
        }
    }
    Ok(Some(arguments))
}
