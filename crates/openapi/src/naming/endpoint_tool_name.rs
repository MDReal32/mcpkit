use crate::consts::{METHOD_SEPARATOR, ROOT_PATH};
use crate::endpoints::Endpoint;

/// The tool name of an endpoint: the path its requests go to below the base URL, without the leading `/`, and its
/// method (`GET /repos/{owner}/{repo}/branches` → `repos/{owner}/{repo}/branches:get`).
pub fn endpoint_tool_name(endpoint: &Endpoint) -> String {
    let path = endpoint.path.trim_start_matches('/');
    let path = if path.is_empty() { ROOT_PATH } else { path };
    format!("{path}{METHOD_SEPARATOR}{}", endpoint.method)
}
