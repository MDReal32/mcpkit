use crate::consts::WINDOW_APP_ORIGINS;
use hyper::HeaderMap;
use hyper::header::{HeaderValue, ORIGIN};

/// The `Origin` of a request when it is a page of the window app; None for a request without one (the page the
/// server serves itself) and for any other origin.
pub fn allowed_origin(headers: &HeaderMap<HeaderValue>) -> Option<HeaderValue> {
    let origin = headers.get(ORIGIN)?;
    WINDOW_APP_ORIGINS
        .iter()
        .any(|allowed| origin.as_bytes() == allowed.as_bytes())
        .then(|| origin.clone())
}
