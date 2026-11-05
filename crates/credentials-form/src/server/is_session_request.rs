use crate::server::form_session::FormSession;
use hyper::header::HOST;
use hyper::{HeaderMap, http::HeaderValue};
use usemcpkit_auth::credentials::CREDENTIALS_FORM_SESSION_HEADER;

/// The Host check stops DNS rebinding; the token from the URL fragment proves the caller loaded this page.
pub fn is_session_request(session: &FormSession, headers: &HeaderMap<HeaderValue>, require_token: bool) -> bool {
    let header = |name: &str| headers.get(name).and_then(|value| value.to_str().ok());
    if header(HOST.as_str()) != Some(session.host.as_str()) {
        return false;
    }
    !require_token || header(CREDENTIALS_FORM_SESSION_HEADER) == Some(session.token.as_str())
}
