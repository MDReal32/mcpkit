use crate::json_response::json_response;
use mcpkit_core::LocalFuture;
use mcpkit_http::{HttpClient, HttpError, HttpRequest, HttpResponse};
use serde_json::{Value, json};
use std::cell::RefCell;
use std::collections::HashMap;
use std::time::Duration;

/// Serves `token_routes` as JSON; every other request gets 200 `{ "pong": true }` only for
/// `Authorization: Bearer <valid_token>` and 401 otherwise. Records the Authorization header of every API request and
/// the body of every token request.
pub struct TokenCheckingClient {
    valid_token: String,
    token_routes: HashMap<String, Value>,
    pub sent_authorizations: RefCell<Vec<String>>,
    pub token_requests: RefCell<Vec<HttpRequest>>,
}

impl TokenCheckingClient {
    pub fn new<I: IntoIterator<Item = (String, Value)>>(valid_token: &str, token_routes: I) -> Self {
        TokenCheckingClient {
            valid_token: valid_token.to_owned(),
            token_routes: token_routes.into_iter().collect(),
            sent_authorizations: RefCell::new(Vec::new()),
            token_requests: RefCell::new(Vec::new()),
        }
    }
}

impl HttpClient for TokenCheckingClient {
    fn send<'a>(
        &'a self,
        request: &'a HttpRequest,
        _timeout: Duration,
    ) -> LocalFuture<'a, Result<HttpResponse, HttpError>> {
        let response = match self.token_routes.get(&request.url) {
            Some(body) => {
                self.token_requests.borrow_mut().push(request.clone());
                json_response(200, body)
            }
            None => {
                let authorization = request
                    .headers
                    .iter()
                    .find(|(name, _)| name.eq_ignore_ascii_case("authorization"))
                    .map(|(_, value)| value.clone())
                    .unwrap_or_default();
                let accepted = authorization == format!("Bearer {}", self.valid_token);
                self.sent_authorizations.borrow_mut().push(authorization);
                match accepted {
                    true => json_response(200, &json!({ "pong": true })),
                    false => json_response(401, &json!({ "message": "Bad credentials" })),
                }
            }
        };
        Box::pin(async move { Ok(response) })
    }
}
