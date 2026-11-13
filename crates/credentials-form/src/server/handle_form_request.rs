use crate::host_check::check_version;
use crate::server::allowed_origin::allowed_origin;
use crate::server::answer_preflight::answer_preflight;
use crate::server::form_session::FormSession;
use crate::server::is_session_request::is_session_request;
use crate::server::send_errors::send_errors;
use crate::server::send_json::send_json;
use crate::submit_answer::submit_answer;
use crate::token_import::import_token;
use bytes::Bytes;
use http_body_util::Full;
use hyper::body::Incoming;
use hyper::header::{ACCESS_CONTROL_ALLOW_ORIGIN, CACHE_CONTROL, CONTENT_TYPE, HeaderValue, VARY};
use hyper::{Method, Request, Response, StatusCode};
use serde_json::json;
use usemcpkit_auth::credentials::{
    CREDENTIALS_FORM_CANCEL_PATH, CREDENTIALS_FORM_CHECK_PATH, CREDENTIALS_FORM_IMPORT_PATH,
    CREDENTIALS_FORM_SUBMIT_PATH,
};

/// The page at `GET /` (Host checked) and the API under `/api` (Host and session token checked). A page of the window
/// app calls the API from its own origin, so that origin, and only it, gets CORS headers and its preflight answered.
pub async fn handle_form_request(session: &FormSession, request: Request<Incoming>) -> Response<Full<Bytes>> {
    let origin = allowed_origin(request.headers());
    let mut response = answer_form_request(session, request, origin.is_some()).await;
    if let Some(origin) = origin {
        let headers = response.headers_mut();
        headers.insert(ACCESS_CONTROL_ALLOW_ORIGIN, origin);
        headers.insert(VARY, HeaderValue::from_static("Origin"));
    }
    response
}

async fn answer_form_request(
    session: &FormSession,
    request: Request<Incoming>,
    from_window_app: bool,
) -> Response<Full<Bytes>> {
    if request.method() == Method::OPTIONS && from_window_app && is_session_request(session, request.headers(), false) {
        return answer_preflight();
    }
    let is_page = request.method() == Method::GET && request.uri().path() == "/";
    if !is_session_request(session, request.headers(), !is_page) {
        return send_errors(
            StatusCode::FORBIDDEN,
            &["this request does not belong to the open credentials form".to_owned()],
        );
    }
    if is_page {
        let mut page = Response::new(Full::new(Bytes::from(session.page.clone())));
        let headers = page.headers_mut();
        headers.insert(CONTENT_TYPE, HeaderValue::from_static("text/html; charset=utf-8"));
        headers.insert(CACHE_CONTROL, HeaderValue::from_static("no-store"));
        return page;
    }
    if request.method() != Method::POST {
        return send_errors(StatusCode::NOT_FOUND, &["not found".to_owned()]);
    }
    let path = request.uri().path().to_owned();
    let body = request.into_body();
    match path.as_str() {
        CREDENTIALS_FORM_SUBMIT_PATH => submit_answer(session, body).await,
        CREDENTIALS_FORM_IMPORT_PATH => import_token(session, body).await,
        CREDENTIALS_FORM_CHECK_PATH => check_version(session, body).await,
        CREDENTIALS_FORM_CANCEL_PATH => {
            session.cancel();
            send_json(StatusCode::OK, &json!({}))
        }
        _ => send_errors(StatusCode::NOT_FOUND, &["not found".to_owned()]),
    }
}
