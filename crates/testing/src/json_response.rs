use mcpkit_http::HttpResponse;
use serde_json::Value;

pub fn json_response(status: u16, body: &Value) -> HttpResponse {
    HttpResponse {
        status,
        content_type: Some("application/json".to_owned()),
        headers: Vec::new(),
        body: body.to_string().into_bytes(),
    }
}
