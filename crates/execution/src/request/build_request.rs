use crate::ToolError;
use crate::args::ToolArgs;
use crate::request::build_request_body::build_request_body;
use crate::request::build_request_url::build_request_url;
use crate::request::collect_args::collect_args;
use crate::request::consts::JSON_CONTENT_TYPE;
use crate::request::fill_path::fill_path;
use indexmap::IndexMap;
use mcpkit_auth::ResolvedAuth;
use mcpkit_http::HttpRequest;
use mcpkit_manifest::Manifest;
use mcpkit_manifest::tool::{HttpMethod, ToolSpec};
use serde_json::Value;

/// Expects args already passed through `prepare_tool_args` and `load_file_args`. Later headers and query values win:
/// the manifest's, the tool's fixed ones, the auth's, then the body's content type.
pub fn build_request(
    manifest: &Manifest,
    tool: &ToolSpec,
    args: &ToolArgs,
    auth: &ResolvedAuth,
) -> Result<HttpRequest, ToolError> {
    let spec = &tool.request;
    let content_type = spec.content_type.as_deref().unwrap_or(JSON_CONTENT_TYPE);
    let content = match spec.method {
        HttpMethod::Get => None,
        _ => build_request_body(spec, args, content_type),
    };
    let mut params: IndexMap<String, Value> = spec
        .fixed_query
        .iter()
        .flatten()
        .map(|(key, value)| (key.clone(), value.to_value()))
        .collect();
    for (key, value) in collect_args(spec.query.as_ref(), args) {
        params.insert(key, value.to_json());
    }
    for (key, value) in &auth.query {
        params.insert(key.clone(), Value::String(value.clone()));
    }
    let comma_keys = spec.comma_query.as_deref().unwrap_or_default();
    let url = build_request_url(&manifest.base_url, &fill_path(&spec.path, args)?, &params, comma_keys)?;
    let mut headers: IndexMap<String, String> = manifest.headers.clone().unwrap_or_default();
    headers.extend(spec.fixed_headers.clone().unwrap_or_default());
    headers.extend(auth.headers.clone());
    let body = content.map(|content| {
        headers.extend(content.headers);
        content.body
    });
    Ok(HttpRequest {
        url,
        method: spec.method,
        headers,
        body,
    })
}
