use crate::host_check::run_version_check::run_version_check;
use crate::server::{FormSession, read_json_body, send_errors, send_json};
use bytes::Bytes;
use http_body_util::Full;
use hyper::body::Incoming;
use hyper::{Response, StatusCode};
use serde_json::Value;

/// Answers the Check button with the source and version of the typed host; the form stays open either way.
pub async fn check_version(session: &FormSession, body: Incoming) -> Response<Full<Bytes>> {
    let Some(manifest) = &session.request.manifest else {
        return send_errors(StatusCode::NOT_FOUND, &["this form has no Check button".to_owned()]);
    };
    let checked = match read_json_body(body).await {
        Ok(Value::Object(body)) => run_version_check(manifest, &body).await,
        Ok(_) => Err("the check must be a JSON object".to_owned()),
        Err(error) => Err(error),
    };
    match checked {
        Ok(found) => match serde_json::to_value(found) {
            Ok(found) => send_json(StatusCode::OK, &found),
            Err(error) => send_errors(StatusCode::INTERNAL_SERVER_ERROR, &[error.to_string()]),
        },
        Err(error) => send_errors(StatusCode::BAD_REQUEST, &[error]),
    }
}
