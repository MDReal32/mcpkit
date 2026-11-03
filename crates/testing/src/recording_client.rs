use crate::json_response::json_response;
use mcpkit_core::LocalFuture;
use mcpkit_http::{HttpClient, HttpError, HttpRequest, HttpResponse};
use serde_json::{Value, json};
use std::cell::RefCell;
use std::collections::HashMap;
use std::time::Duration;

/// Serves JSON per URL, 404 `{ "message": "Not Found" }` for any other, and records every request.
pub struct RecordingClient {
    routes: HashMap<String, Value>,
    pub requests: RefCell<Vec<HttpRequest>>,
}

impl RecordingClient {
    pub fn new<I: IntoIterator<Item = (String, Value)>>(routes: I) -> Self {
        RecordingClient {
            routes: routes.into_iter().collect(),
            requests: RefCell::new(Vec::new()),
        }
    }

    pub fn urls(&self) -> Vec<String> {
        self.requests
            .borrow()
            .iter()
            .map(|request| request.url.clone())
            .collect()
    }
}

impl HttpClient for RecordingClient {
    fn send<'a>(
        &'a self,
        request: &'a HttpRequest,
        _timeout: Duration,
    ) -> LocalFuture<'a, Result<HttpResponse, HttpError>> {
        self.requests.borrow_mut().push(request.clone());
        let response = match self.routes.get(&request.url) {
            Some(body) => json_response(200, body),
            None => json_response(404, &json!({ "message": "Not Found" })),
        };
        Box::pin(async move { Ok(response) })
    }
}
