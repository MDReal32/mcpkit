use crate::consts::PREFLIGHT_MAX_AGE_SECONDS;
use bytes::Bytes;
use http_body_util::Full;
use hyper::header::{
    ACCESS_CONTROL_ALLOW_HEADERS, ACCESS_CONTROL_ALLOW_METHODS, ACCESS_CONTROL_MAX_AGE, CONTENT_TYPE, HeaderValue,
};
use hyper::{Response, StatusCode};
use usemcpkit_auth::credentials::CREDENTIALS_FORM_SESSION_HEADER;

/// The answer to a browser's preflight for an API call of the window app: POST with the session header and JSON.
pub fn answer_preflight() -> Response<Full<Bytes>> {
    let mut response = Response::new(Full::new(Bytes::new()));
    *response.status_mut() = StatusCode::NO_CONTENT;
    let headers = response.headers_mut();
    headers.insert(ACCESS_CONTROL_ALLOW_METHODS, HeaderValue::from_static("POST"));
    headers.insert(
        ACCESS_CONTROL_ALLOW_HEADERS,
        HeaderValue::from_str(&format!("{CREDENTIALS_FORM_SESSION_HEADER}, {}", CONTENT_TYPE.as_str()))
            .expect("the session header name is a valid header value"),
    );
    headers.insert(
        ACCESS_CONTROL_MAX_AGE,
        HeaderValue::from_static(PREFLIGHT_MAX_AGE_SECONDS),
    );
    response
}
