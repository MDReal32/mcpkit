use crate::auth::validate_sign_in_fields::validate_sign_in_fields;
use crate::guards::is_https_url;
use serde_json::{Map, Value};

pub fn validate_oauth_fields(auth: &Map<String, Value>, location: &str) -> Vec<String> {
    let mut errors = Vec::new();
    if auth.contains_key("discovery") {
        if !is_https_url(auth.get("discovery")) {
            errors.push(format!("{location}.discovery must be an https:// URL"));
        }
    } else {
        if !is_https_url(auth.get("authorizationUrl")) {
            errors.push(format!("{location}.authorizationUrl must be an https:// URL"));
        }
        if !is_https_url(auth.get("tokenUrl")) {
            errors.push(format!("{location}.tokenUrl must be an https:// URL"));
        }
    }
    if auth.get("clientSecretEnv").is_some_and(|env| !env.is_string()) {
        errors.push(format!("{location}.clientSecretEnv must be a string"));
    }
    if auth
        .get("clientAuthentication")
        .is_some_and(|method| method.as_str() != Some("body") && method.as_str() != Some("basic"))
    {
        errors.push(format!("{location}.clientAuthentication must be \"body\" or \"basic\""));
    }
    errors.extend(validate_sign_in_fields(auth, location));
    errors
}
