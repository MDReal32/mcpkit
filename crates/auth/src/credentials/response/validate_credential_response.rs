use crate::credentials::CredentialRequest;
use crate::credentials::response::validate_response_domain::validate_response_domain;
use crate::credentials::response::validate_token_response::validate_token_response;
use serde_json::Value;

/// The form answer comes over a local HTTP request, so it is checked against what was asked; empty when it fits.
pub fn validate_credential_response(request: &CredentialRequest, response: &Value) -> Vec<String> {
    let Some(response) = response.as_object() else {
        return vec!["the answer must be a JSON object".to_owned()];
    };
    let mut errors = validate_response_domain(request, response.get("domain"));
    match response.get("method").and_then(Value::as_str) {
        Some("sign-in") if request.sign_in => errors,
        Some("sign-in") => {
            errors.insert(0, "this server has no sign-in".to_owned());
            errors
        }
        Some("token") => {
            errors.extend(validate_token_response(request, response));
            errors
        }
        _ => vec!["method must be \"token\" or \"sign-in\"".to_owned()],
    }
}
