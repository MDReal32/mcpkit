use std::cell::RefCell;
use std::time::Duration;
use usemcpkit_core::LocalFuture;
use usemcpkit_http::{HttpClient, HttpError, HttpRequest, HttpResponse};

/// Answers every request with the same response and records what it was sent.
pub struct FixedClient {
    response: HttpResponse,
    pub requests: RefCell<Vec<HttpRequest>>,
}

impl FixedClient {
    pub fn new(response: HttpResponse) -> Self {
        FixedClient {
            response,
            requests: RefCell::new(Vec::new()),
        }
    }
}

impl HttpClient for FixedClient {
    fn send<'a>(
        &'a self,
        request: &'a HttpRequest,
        _timeout: Duration,
    ) -> LocalFuture<'a, Result<HttpResponse, HttpError>> {
        self.requests.borrow_mut().push(request.clone());
        Box::pin(async move { Ok(self.response.clone()) })
    }
}
