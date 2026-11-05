use crate::oauth::consts::{CALLBACK_PAGE, CALLBACK_PAGE_CONTENT_TYPE, CALLBACK_PATH, LOOPBACK_HOST};
use crate::oauth::sign_in::callback_params::CallbackParams;
use bytes::Bytes;
use http_body_util::Full;
use hyper::body::Incoming;
use hyper::header::CONTENT_TYPE;
use hyper::{Request, Response, StatusCode};
use std::sync::{Arc, Mutex};
use tokio::sync::oneshot;
use url::Url;

pub type CallbackSender = Arc<Mutex<Option<oneshot::Sender<CallbackParams>>>>;

/// Answers the browser: the callback page for the redirect, whose query goes to the sign-in, and 404 for anything else.
pub fn answer_callback(request: &Request<Incoming>, sender: &CallbackSender) -> Response<Full<Bytes>> {
    let callback = Url::parse(&format!("http://{LOOPBACK_HOST}{}", request.uri()))
        .ok()
        .filter(|url| url.path() == CALLBACK_PATH);
    let Some(callback) = callback else {
        let mut not_found = Response::new(Full::new(Bytes::new()));
        *not_found.status_mut() = StatusCode::NOT_FOUND;
        return not_found;
    };
    let params = CallbackParams(callback.query_pairs().into_owned().collect());
    let waiting = sender.lock().ok().and_then(|mut sender| sender.take());
    if let Some(waiting) = waiting {
        waiting.send(params).ok();
    }
    let mut page = Response::new(Full::new(Bytes::from_static(CALLBACK_PAGE.as_bytes())));
    page.headers_mut().insert(
        CONTENT_TYPE,
        hyper::header::HeaderValue::from_static(CALLBACK_PAGE_CONTENT_TYPE),
    );
    page
}
