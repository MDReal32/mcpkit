use crate::consts::JSON_CONTENT_TYPE;
use crate::document::body_content_type::body_content_type;
use crate::document::consts::SWAGGER2_COPIED_FIELDS;
use crate::document::file_aware_schema::file_aware_schema;
use crate::document::read_strings::read_strings;
use crate::document::upgrade_swagger2_parameter::upgrade_swagger2_parameter;
use serde_json::{Map, Value, json};

/// A Swagger 2.0 operation as OpenAPI 3: `body` and `formData` parameters become its `requestBody`, `schema` of each
/// response its `content`. `resolve` reads a `#/parameters/…` reference of the original document.
pub fn upgrade_swagger2_operation(
    operation: &Map<String, Value>,
    consumes: &[String],
    produces: &[String],
    resolve: &dyn Fn(&Value) -> Option<Map<String, Value>>,
) -> Value {
    let consumes = match read_strings(operation.get("consumes")) {
        own if own.is_empty() => consumes.to_vec(),
        own => own,
    };
    let produces = match read_strings(operation.get("produces")) {
        own if own.is_empty() => produces.to_vec(),
        own => own,
    };
    let mut upgraded = Map::new();
    for key in SWAGGER2_COPIED_FIELDS {
        if let Some(value) = operation.get(key) {
            upgraded.insert(key.to_owned(), value.clone());
        }
    }
    let mut parameters = Vec::new();
    let mut form_properties = Map::new();
    let mut form_required = Vec::new();
    let mut has_file = false;
    let mut body = None;
    for parameter in operation
        .get("parameters")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
    {
        let Some(resolved) = resolve(parameter) else {
            parameters.push(parameter.clone());
            continue;
        };
        match resolved.get("in").and_then(Value::as_str) {
            Some("body") => body = Some(resolved),
            Some("formData") => {
                let Some(name) = resolved.get("name").and_then(Value::as_str) else {
                    continue;
                };
                has_file |= resolved.get("type").and_then(Value::as_str) == Some("file");
                let mut schema = file_aware_schema(&resolved);
                if let (Some(description), Value::Object(fields)) = (resolved.get("description"), &mut schema) {
                    fields.insert("description".to_owned(), description.clone());
                }
                form_properties.insert(name.to_owned(), schema);
                if resolved.get("required").and_then(Value::as_bool) == Some(true) {
                    form_required.push(Value::String(name.to_owned()));
                }
            }
            _ if parameter.get("$ref").is_some() => parameters.push(parameter.clone()),
            _ => parameters.push(upgrade_swagger2_parameter(&resolved)),
        }
    }
    if !parameters.is_empty() {
        upgraded.insert("parameters".to_owned(), Value::Array(parameters));
    }
    if let Some(body) = body {
        let content_type = body_content_type(&consumes, false);
        let schema = body.get("schema").cloned().unwrap_or_else(|| json!({}));
        upgraded.insert(
            "requestBody".to_owned(),
            json!({
                "required": body.get("required").and_then(Value::as_bool).unwrap_or(false),
                "content": { content_type: { "schema": schema } },
            }),
        );
    } else if !form_properties.is_empty() {
        let content_type = body_content_type(&consumes, has_file);
        let mut schema = Map::new();
        schema.insert("type".to_owned(), json!("object"));
        schema.insert("properties".to_owned(), Value::Object(form_properties));
        if !form_required.is_empty() {
            schema.insert("required".to_owned(), Value::Array(form_required.clone()));
        }
        upgraded.insert(
            "requestBody".to_owned(),
            json!({ "required": !form_required.is_empty(), "content": { content_type: { "schema": schema } } }),
        );
    }
    let mut responses = Map::new();
    for (status, response) in operation
        .get("responses")
        .and_then(Value::as_object)
        .into_iter()
        .flatten()
    {
        let mut upgraded_response = Map::new();
        if let Some(description) = response.get("description") {
            upgraded_response.insert("description".to_owned(), description.clone());
        }
        if response.get("$ref").is_some() {
            responses.insert(status.clone(), response.clone());
            continue;
        }
        if let Some(schema) = response.get("schema") {
            let schema = if schema.get("type").and_then(Value::as_str) == Some("file") {
                json!({ "type": "string", "format": "binary" })
            } else {
                schema.clone()
            };
            let content_types = if produces.is_empty() {
                vec![JSON_CONTENT_TYPE.to_owned()]
            } else {
                produces.clone()
            };
            let content: Map<String, Value> = content_types
                .into_iter()
                .map(|content_type| (content_type, json!({ "schema": schema })))
                .collect();
            upgraded_response.insert("content".to_owned(), Value::Object(content));
        }
        responses.insert(status.clone(), Value::Object(upgraded_response));
    }
    upgraded.insert("responses".to_owned(), Value::Object(responses));
    Value::Object(upgraded)
}
