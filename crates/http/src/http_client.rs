use crate::http_error::HttpError;
use crate::http_request::HttpRequest;
use crate::http_response::HttpResponse;
use mcpkit_core::LocalFuture;
use std::time::Duration;

/// Sends a request and reads its whole response; tests answer with a fake instead of the network.
pub trait HttpClient {
    fn send<'a>(
        &'a self,
        request: &'a HttpRequest,
        timeout: Duration,
    ) -> LocalFuture<'a, Result<HttpResponse, HttpError>>;
}
