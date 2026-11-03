use crate::server::{FormSession, read_json_body, send_errors, send_json};
use bytes::Bytes;
use http_body_util::Full;
use hyper::body::Incoming;
use hyper::{Response, StatusCode};
use mcpkit_auth::credentials::validate_credential_response;
use serde_json::json;

/// Takes the page's answer once it fits the request; otherwise the page shows the errors and the form stays open.
pub async fn submit_answer(session: &FormSession, body: Incoming) -> Response<Full<Bytes>> {
    let answer = match read_json_body(body).await {
        Ok(answer) => answer,
        Err(error) => return send_errors(StatusCode::BAD_REQUEST, &[error]),
    };
    let errors = validate_credential_response(&session.request, &answer);
    if !errors.is_empty() {
        return send_errors(StatusCode::BAD_REQUEST, &errors);
    }
    session.answer(answer);
    send_json(StatusCode::OK, &json!({}))
}
