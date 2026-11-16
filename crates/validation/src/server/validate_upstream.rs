use crate::server::validate_http_upstream::validate_http_upstream;
use crate::server::validate_stdio_upstream::validate_stdio_upstream;
use crate::server::validate_upstream_naming::validate_upstream_naming;
use serde_json::Value;

pub fn validate_upstream(upstream: &Value, has_domain: bool) -> Vec<String> {
    let Some(upstream) = upstream.as_object() else {
        return vec!["upstream must be an object".to_owned()];
    };
    let mut errors = match upstream.get("type").and_then(Value::as_str) {
        Some("http") => validate_http_upstream(upstream, has_domain),
        Some("stdio") => validate_stdio_upstream(upstream),
        _ => return vec!["upstream.type must be \"http\" or \"stdio\"".to_owned()],
    };
    if let Some(naming) = upstream.get("naming") {
        errors.extend(validate_upstream_naming(naming));
    }
    errors
}
