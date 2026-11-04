use std::cell::RefCell;
use std::collections::HashMap;
use std::time::Duration;
use usemcpkit_core::LocalFuture;
use usemcpkit_http::{HttpClient, HttpError, HttpRequest, HttpResponse};

/// Serves a prepared response per URL, an empty 404 for any other, and records every request.
pub struct RouteClient {
    routes: HashMap<String, HttpResponse>,
    pub requests: RefCell<Vec<HttpRequest>>,
}

impl RouteClient {
    pub fn new<I: IntoIterator<Item = (String, HttpResponse)>>(routes: I) -> Self {
        RouteClient {
            routes: routes.into_iter().collect(),
            requests: RefCell::new(Vec::new()),
        }
    }
}

impl HttpClient for RouteClient {
    fn send<'a>(
        &'a self,
        request: &'a HttpRequest,
        _timeout: Duration,
    ) -> LocalFuture<'a, Result<HttpResponse, HttpError>> {
        self.requests.borrow_mut().push(request.clone());
        let response = self.routes.get(&request.url).cloned().unwrap_or(HttpResponse {
            status: 404,
            ..HttpResponse::default()
        });
        Box::pin(async move { Ok(response) })
    }
}
