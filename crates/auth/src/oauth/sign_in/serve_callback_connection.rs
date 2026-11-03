use crate::oauth::sign_in::answer_callback::{CallbackSender, answer_callback};
use hyper::server::conn::http1;
use hyper::service::service_fn;
use hyper_util::rt::TokioIo;
use std::convert::Infallible;
use tokio::net::TcpStream;

/// Serves one browser connection for one request. A connection that breaks is the browser's business, so its error is
/// dropped: the sign-in only waits for the callback, or times out.
pub async fn serve_callback_connection(stream: TcpStream, sender: CallbackSender) {
    let service = service_fn(move |request| {
        let response = answer_callback(&request, &sender);
        async move { Ok::<_, Infallible>(response) }
    });
    let served = http1::Builder::new()
        .keep_alive(false)
        .serve_connection(TokioIo::new(stream), service)
        .await;
    drop(served);
}
