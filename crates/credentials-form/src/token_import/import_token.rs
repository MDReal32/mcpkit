use crate::server::{FormSession, send_errors, send_json};
use crate::token_import::read_imported_answer::read_imported_answer;
use bytes::Bytes;
use http_body_util::Full;
use hyper::body::Incoming;
use hyper::{Response, StatusCode};
use serde_json::json;

/// Answers the form with a token from the provider's CLI, so the token never passes through the page.
pub async fn import_token(session: &FormSession, body: Incoming) -> Response<Full<Bytes>> {
    match read_imported_answer(session, body).await {
        Ok(answer) => {
            session.answer(answer);
            send_json(StatusCode::OK, &json!({}))
        }
        Err(error) => send_errors(StatusCode::BAD_REQUEST, &[error]),
    }
}
