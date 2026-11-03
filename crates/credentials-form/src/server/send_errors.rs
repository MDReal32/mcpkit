use crate::server::send_json::send_json;
use bytes::Bytes;
use http_body_util::Full;
use hyper::{Response, StatusCode};
use serde_json::json;

/// The `{ "errors": [...] }` body the page shows under the form.
pub fn send_errors(status: StatusCode, errors: &[String]) -> Response<Full<Bytes>> {
    send_json(status, &json!({ "errors": errors }))
}
