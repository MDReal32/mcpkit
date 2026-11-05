use crate::AuthError;
use serde_json::Value;
use usemcpkit_http::HttpResponse;

pub fn read_json_body(response: &HttpResponse, server_name: &str) -> Result<Value, AuthError> {
    serde_json::from_str(&response.text()).map_err(|error| {
        AuthError(format!(
            "{server_name}: token endpoint returned {} with invalid JSON: {error}",
            response.status
        ))
    })
}
