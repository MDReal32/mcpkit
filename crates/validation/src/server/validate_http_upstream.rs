use crate::auth::validate_auth;
use crate::guards::is_https_url;
use serde_json::{Map, Value};

/// An HTTP upstream may carry its own `auth`, tried instead of the manifest's for the connection to it.
pub fn validate_http_upstream(upstream: &Map<String, Value>, has_domain: bool) -> Vec<String> {
    let mut errors = Vec::new();
    if !is_https_url(upstream.get("url")) {
        errors.push("upstream.url must be an https:// URL".to_owned());
    }
    errors.extend(validate_auth(upstream.get("auth"), "upstream.auth", has_domain));
    errors
}
