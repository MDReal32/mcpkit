use crate::OpenApiError;
use serde_json::json;
use usemcpkit_manifest::tool::HttpMethod;

/// A document's lowercase method as a request method.
pub fn to_http_method(method: &str) -> Result<HttpMethod, OpenApiError> {
    serde_json::from_value(json!(method.to_ascii_uppercase()))
        .map_err(|_| OpenApiError(format!("unsupported method {method}")))
}
