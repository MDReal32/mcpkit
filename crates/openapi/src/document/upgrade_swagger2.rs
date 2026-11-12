use crate::consts::HTTP_METHODS;
use crate::document::consts::OPENAPI_VERSION;
use crate::document::is_body_parameter::is_body_parameter;
use crate::document::read_strings::read_strings;
use crate::document::rewrite_references::rewrite_references;
use crate::document::upgrade_swagger2_operation::upgrade_swagger2_operation;
use crate::document::upgrade_swagger2_parameter::upgrade_swagger2_parameter;
use serde_json::{Map, Value, json};

/// A Swagger 2.0 document as OpenAPI 3.0, as far as the tools read it: `basePath` becomes the server url,
/// `definitions` the component schemas, `body`/`formData` parameters request bodies, response schemas response content.
pub fn upgrade_swagger2(swagger: &Value) -> Value {
    let swagger = rewrite_references(swagger);
    let global_parameters = swagger
        .get("parameters")
        .and_then(Value::as_object)
        .cloned()
        .unwrap_or_default();
    let consumes = read_strings(swagger.get("consumes"));
    let produces = read_strings(swagger.get("produces"));
    let resolve = |parameter: &Value| -> Option<Map<String, Value>> {
        match parameter.get("$ref").and_then(Value::as_str) {
            Some(reference) => reference
                .strip_prefix("#/components/parameters/")
                .and_then(|name| global_parameters.get(name))
                .and_then(Value::as_object)
                .cloned(),
            None => parameter.as_object().cloned(),
        }
    };
    let mut upgraded = Map::new();
    upgraded.insert("openapi".to_owned(), json!(OPENAPI_VERSION));
    for key in ["info", "tags", "security", "externalDocs"] {
        if let Some(value) = swagger.get(key) {
            upgraded.insert(key.to_owned(), value.clone());
        }
    }
    if let Some(base_path) = swagger.get("basePath").and_then(Value::as_str) {
        upgraded.insert("servers".to_owned(), json!([{ "url": base_path }]));
    }
    let mut paths = Map::new();
    for (path, item) in swagger.get("paths").and_then(Value::as_object).into_iter().flatten() {
        let Some(item) = item.as_object() else {
            continue;
        };
        let mut upgraded_item = Map::new();
        if let Some(shared) = item.get("parameters").and_then(Value::as_array) {
            let shared_body: Vec<Value> = shared
                .iter()
                .filter(|parameter| {
                    resolve(parameter).is_some_and(|resolved| is_body_parameter(&Value::Object(resolved)))
                })
                .cloned()
                .collect();
            let kept: Vec<Value> = shared
                .iter()
                .filter(|parameter| !shared_body.contains(parameter))
                .map(|parameter| match parameter.get("$ref") {
                    Some(_) => parameter.clone(),
                    None => parameter
                        .as_object()
                        .map_or_else(|| parameter.clone(), upgrade_swagger2_parameter),
                })
                .collect();
            if !kept.is_empty() {
                upgraded_item.insert("parameters".to_owned(), Value::Array(kept));
            }
            for method in HTTP_METHODS {
                if let Some(Value::Object(operation)) = item.get(method)
                    && !shared_body.is_empty()
                {
                    let mut with_shared = operation.clone();
                    let mut parameters = shared_body.clone();
                    parameters.extend(
                        operation
                            .get("parameters")
                            .and_then(Value::as_array)
                            .cloned()
                            .unwrap_or_default(),
                    );
                    with_shared.insert("parameters".to_owned(), Value::Array(parameters));
                    upgraded_item.insert(
                        method.to_owned(),
                        upgrade_swagger2_operation(&with_shared, &consumes, &produces, &resolve),
                    );
                }
            }
        }
        for method in HTTP_METHODS {
            if upgraded_item.contains_key(method) {
                continue;
            }
            if let Some(Value::Object(operation)) = item.get(method) {
                upgraded_item.insert(
                    method.to_owned(),
                    upgrade_swagger2_operation(operation, &consumes, &produces, &resolve),
                );
            }
        }
        paths.insert(path.clone(), Value::Object(upgraded_item));
    }
    upgraded.insert("paths".to_owned(), Value::Object(paths));
    let mut components = Map::new();
    if let Some(definitions) = swagger.get("definitions") {
        components.insert("schemas".to_owned(), definitions.clone());
    }
    let parameters: Map<String, Value> = global_parameters
        .iter()
        .filter(|(_, parameter)| !is_body_parameter(parameter))
        .filter_map(|(name, parameter)| Some((name.clone(), upgrade_swagger2_parameter(parameter.as_object()?))))
        .collect();
    if !parameters.is_empty() {
        components.insert("parameters".to_owned(), Value::Object(parameters));
    }
    if let Some(responses) = swagger.get("responses") {
        components.insert("responses".to_owned(), responses.clone());
    }
    if let Some(schemes) = swagger.get("securityDefinitions") {
        components.insert("securitySchemes".to_owned(), schemes.clone());
    }
    upgraded.insert("components".to_owned(), Value::Object(components));
    Value::Object(upgraded)
}
