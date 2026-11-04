use crate::guards::{HTTP_METHODS, is_http_method};
use crate::tool::validate_arg_spec::validate_arg_spec;
use crate::tool::validate_body_arg::validate_body_arg;
use crate::tool::validate_comma_query::validate_comma_query;
use crate::tool::validate_content_type::validate_content_type;
use crate::tool::validate_file_args::validate_file_args;
use crate::tool::validate_fixed_headers::validate_fixed_headers;
use crate::tool::validate_fixed_values::validate_fixed_values;
use crate::tool::validate_request_path::validate_request_path;
use crate::tool::validate_save_to_arg::validate_save_to_arg;
use serde_json::Value;
use std::collections::HashSet;

pub fn validate_request(request: Option<&Value>, declared_args: &HashSet<&str>, location: &str) -> Vec<String> {
    let Some(request) = request.and_then(Value::as_object) else {
        return vec![format!("{location}.request is required")];
    };
    let mut errors = Vec::new();
    if !is_http_method(request.get("method")) {
        errors.push(format!(
            "{location}.request.method must be one of: {}",
            HTTP_METHODS.join(", ")
        ));
    }
    errors.extend(validate_request_path(request.get("path"), declared_args, location));
    errors.extend(validate_arg_spec(
        request.get("query"),
        declared_args,
        &format!("{location}.request.query"),
    ));
    errors.extend(validate_arg_spec(
        request.get("body"),
        declared_args,
        &format!("{location}.request.body"),
    ));
    errors.extend(validate_save_to_arg(request.get("saveToArg"), declared_args, location));
    errors.extend(validate_file_args(
        request.get("fileArgs"),
        declared_args,
        &format!("{location}.request.fileArgs"),
    ));
    errors.extend(validate_content_type(request, location));
    errors.extend(validate_body_arg(request, declared_args, location));
    errors.extend(validate_fixed_values(
        request.get("fixedQuery"),
        &format!("{location}.request.fixedQuery"),
    ));
    errors.extend(validate_comma_query(
        request.get("commaQuery"),
        &format!("{location}.request.commaQuery"),
    ));
    errors.extend(validate_fixed_headers(
        request.get("fixedHeaders"),
        &format!("{location}.request.fixedHeaders"),
    ));
    errors.extend(validate_fixed_values(
        request.get("fixedBody"),
        &format!("{location}.request.fixedBody"),
    ));
    errors
}
