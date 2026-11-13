use crate::OpenApiError;
use crate::body::build_body_arguments;
use crate::consts::{BODY_PREFIX, JSON_CONTENT_TYPE, PATH_PREFIX, QUERY_PREFIX, SAVE_TO_ARGUMENT, SAVE_TO_DESCRIPTION};
use crate::document::SpecDocument;
use crate::endpoints::{Endpoint, is_download};
use crate::schema::{Conversion, build_parameter_schema};
use crate::tool::ArgumentNames;
use crate::tool::collect_comma_query::collect_comma_query;
use crate::tool::collect_fixed_headers::collect_fixed_headers;
use crate::tool::describe_endpoint::describe_endpoint;
use crate::tool::to_http_method::to_http_method;
use crate::tool::to_name_selection::to_name_selection;
use indexmap::IndexMap;
use serde_json::{Map, Value, json};
use usemcpkit_manifest::tool::{RequestSpec, ToolSpec};

/// The tool of one endpoint: path parameters, then query parameters, then `save_to` for a download, then the body's
/// arguments, each renamed apart when names collide.
pub fn build_tool(
    document: &SpecDocument,
    endpoint: &Endpoint,
    name: String,
    conversion: &Conversion,
) -> Result<ToolSpec, OpenApiError> {
    let path_parameters: Vec<_> = endpoint
        .parameters
        .iter()
        .filter(|parameter| parameter.location == "path")
        .collect();
    let query_parameters: Vec<_> = endpoint
        .parameters
        .iter()
        .filter(|parameter| parameter.location == "query")
        .collect();
    let mut names = ArgumentNames::default();
    let mut properties = Map::new();
    let mut required = Vec::new();
    let mut path = endpoint.path.clone();
    for parameter in &path_parameters {
        let argument = names.claim(&parameter.name, PATH_PREFIX);
        properties.insert(
            argument.clone(),
            Value::Object(build_parameter_schema(document, parameter, conversion)?),
        );
        if argument != parameter.name {
            path = path.replace(&format!("{{{}}}", parameter.name), &format!("{{{argument}}}"));
        }
        required.push(argument);
    }
    let mut query_mapping = IndexMap::new();
    for parameter in &query_parameters {
        let argument = names.claim(&parameter.name, QUERY_PREFIX);
        properties.insert(
            argument.clone(),
            Value::Object(build_parameter_schema(document, parameter, conversion)?),
        );
        query_mapping.insert(parameter.name.clone(), argument.clone());
        if parameter.required {
            required.push(argument);
        }
    }
    let save_to_arg = is_download(endpoint, conversion).then(|| names.claim(SAVE_TO_ARGUMENT, BODY_PREFIX));
    if let Some(save_to_arg) = &save_to_arg {
        properties.insert(
            save_to_arg.clone(),
            json!({ "type": "string", "description": SAVE_TO_DESCRIPTION }),
        );
        required.push(save_to_arg.clone());
    }
    let body = match endpoint.operation.get("requestBody") {
        Some(request_body) if endpoint.method != "get" => {
            build_body_arguments(document, request_body, &mut names, conversion)?
        }
        _ => None,
    };
    if let Some(body) = &body {
        properties.extend(body.properties.clone());
        required.extend(body.required.iter().cloned());
    }
    let comma_query = collect_comma_query(&query_parameters);
    let fixed_headers = collect_fixed_headers(&endpoint.parameters);
    let (body_selection, body_arg) = match &body {
        Some(body) => match &body.whole_body {
            Some(whole_body) => (None, Some(whole_body.clone())),
            None => (Some(to_name_selection(body.mapping.clone())), None),
        },
        None => (None, None),
    };
    let request = RequestSpec {
        method: to_http_method(endpoint.method)?,
        path,
        query: (!query_mapping.is_empty()).then(|| to_name_selection(query_mapping)),
        body: body_selection,
        body_arg,
        content_type: body
            .as_ref()
            .map(|body| body.content_type.clone())
            .filter(|content_type| content_type != JSON_CONTENT_TYPE),
        comma_query: (!comma_query.is_empty()).then_some(comma_query),
        file_args: body
            .as_ref()
            .map(|body| body.file_args.clone())
            .filter(|file_args| !file_args.is_empty()),
        save_to_arg,
        fixed_query: conversion.fixed_query.clone(),
        fixed_headers: (!fixed_headers.is_empty()).then_some(fixed_headers),
        fixed_body: None,
    };
    let mut input = Map::new();
    input.insert("type".to_owned(), json!("object"));
    input.insert("properties".to_owned(), Value::Object(properties));
    if !required.is_empty() {
        input.insert("required".to_owned(), json!(required));
    }
    Ok(ToolSpec {
        name,
        description: describe_endpoint(endpoint, conversion),
        input,
        request,
        response: None,
        editions: None,
        applies: None,
    })
}
