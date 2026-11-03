use crate::credentials::CredentialRequest;
use mcpkit_manifest::domain::is_domain_value;
use serde_json::Value;

/// `None` is a domain left out of the answer; a JSON `null` counts as given.
pub fn validate_response_domain(request: &CredentialRequest, domain: Option<&Value>) -> Vec<String> {
    let Some(field) = &request.domain else {
        return match domain {
            None => Vec::new(),
            Some(_) => vec!["the domain of this server cannot be changed".to_owned()],
        };
    };
    if domain.and_then(Value::as_str).is_some_and(is_domain_value) {
        return Vec::new();
    }
    vec![format!("{} must look like host[:port][/path]", field.label)]
}
