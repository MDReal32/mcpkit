use crate::server::form_session::FormSession;
use crate::server::handle_form_request::handle_form_request;
use hyper::server::conn::http1;
use hyper::service::service_fn;
use hyper_util::rt::TokioIo;
use std::convert::Infallible;
use std::sync::Arc;
use tokio::net::TcpStream;

/// Serves one page request per connection, so closing the form never waits on an idle keep-alive. A connection that
/// breaks is the page's business, so its error is dropped: the form only waits for an answer, a cancel or its timeout.
pub async fn serve_form_connection(stream: TcpStream, session: Arc<FormSession>) {
    let service = service_fn(move |request| {
        let session = Arc::clone(&session);
        async move { Ok::<_, Infallible>(handle_form_request(&session, request).await) }
    });
    let served = http1::Builder::new()
        .keep_alive(false)
        .serve_connection(TokioIo::new(stream), service)
        .await;
    drop(served);
}
