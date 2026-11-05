use crate::guards::is_https_url;
use crate::server::validate_stdio_upstream::validate_stdio_upstream;
use crate::server::validate_upstream_naming::validate_upstream_naming;
use serde_json::Value;

pub fn validate_upstream(upstream: &Value) -> Vec<String> {
    let Some(upstream) = upstream.as_object() else {
        return vec!["upstream must be an object".to_owned()];
    };
    let mut errors = match upstream.get("type").and_then(Value::as_str) {
        Some("http") if is_https_url(upstream.get("url")) => Vec::new(),
        Some("http") => vec!["upstream.url must be an https:// URL".to_owned()],
        Some("stdio") => validate_stdio_upstream(upstream),
        _ => return vec!["upstream.type must be \"http\" or \"stdio\"".to_owned()],
    };
    if let Some(naming) = upstream.get("naming") {
        errors.extend(validate_upstream_naming(naming));
    }
    errors
}
