use crate::consts::{
    HTTP_UNAUTHORIZED, MCP_PROTOCOL_VERSION, PROTOCOL_HEADER, REQUEST_TIMEOUT, SESSION_HEADER, TRANSPORT_HEADERS,
};
use crate::transport::create_json_rpc_message::create_json_rpc_message;
use crate::transport::mcp_transport::McpTransport;
use crate::transport::read_event_stream_reply::read_event_stream_reply;
use crate::transport::read_json_rpc_result::read_json_rpc_result;
use crate::upstream_error::UpstreamError;
use crate::upstream_options::UpstreamOptions;
use indexmap::IndexMap;
use serde_json::Value;
use std::cell::{Cell, RefCell};
use std::rc::Rc;
use usemcpkit_core::LocalFuture;
use usemcpkit_core::js::to_js_json;
use usemcpkit_http::{HttpClient, HttpRequest, HttpResponse, RequestBody};
use usemcpkit_manifest::tool::HttpMethod;
use usemcpkit_manifest::upstream::HttpUpstream;

/// Streamable HTTP: every message is a POST, a reply comes back as JSON or as a text/event-stream body, and the
/// session id the server hands out is sent back until `close` ends the session with a DELETE.
pub struct HttpTransport {
    url: String,
    headers: IndexMap<String, String>,
    http: Rc<dyn HttpClient>,
    warn: Rc<dyn Fn(&str)>,
    session_id: RefCell<Option<String>>,
    next_id: Cell<u64>,
}

impl HttpTransport {
    pub fn new(spec: &HttpUpstream, options: &UpstreamOptions) -> Self {
        HttpTransport {
            url: spec.url.clone(),
            headers: options.headers.clone(),
            http: Rc::clone(&options.http),
            warn: Rc::clone(&options.warn),
            session_id: RefCell::new(None),
            next_id: Cell::new(1),
        }
    }

    /// The manifest's headers, then the transport's own, which replace any manifest header of the same name.
    fn request_headers(&self) -> IndexMap<String, String> {
        let mut headers: IndexMap<String, String> = self
            .headers
            .iter()
            .filter(|(name, _)| !TRANSPORT_HEADERS.iter().any(|own| own.eq_ignore_ascii_case(name)))
            .map(|(name, value)| (name.clone(), value.clone()))
            .collect();
        headers.insert("Accept".to_owned(), "application/json, text/event-stream".to_owned());
        headers.insert("Content-Type".to_owned(), "application/json".to_owned());
        headers.insert(PROTOCOL_HEADER.to_owned(), MCP_PROTOCOL_VERSION.to_owned());
        if let Some(session_id) = self.session_id.borrow().as_ref() {
            headers.insert(SESSION_HEADER.to_owned(), session_id.clone());
        }
        headers
    }

    async fn post(&self, message: &Value) -> Result<HttpResponse, UpstreamError> {
        let request = HttpRequest {
            url: self.url.clone(),
            method: HttpMethod::Post,
            headers: self.request_headers(),
            body: Some(RequestBody::Text(to_js_json(message))),
        };
        let response = self
            .http
            .send(&request, REQUEST_TIMEOUT)
            .await
            .map_err(|error| UpstreamError::new(error.0))?;
        if let Some(session_id) = response.header(SESSION_HEADER) {
            self.session_id.replace(Some(session_id.to_owned()));
        }
        if response.status == HTTP_UNAUTHORIZED {
            return Err(UpstreamError::Unauthorized(format!(
                "{} answered {HTTP_UNAUTHORIZED}",
                self.url
            )));
        }
        if !response.is_ok() {
            return Err(UpstreamError::new(format!("{} answered {}", self.url, response.status)));
        }
        Ok(response)
    }

    async fn send_request(&self, method: &str, params: Option<Value>) -> Result<Value, UpstreamError> {
        let id = self.next_id.get();
        self.next_id.set(id + 1);
        let response = self.post(&create_json_rpc_message(Some(id), method, params)).await?;
        let text = response.text();
        let is_event_stream = response
            .content_type
            .as_deref()
            .is_some_and(|content_type| content_type.contains("text/event-stream"));
        let message = match is_event_stream {
            true => read_event_stream_reply(&text, id)?,
            false => serde_json::from_str(&text).map_err(|error| {
                UpstreamError::new(format!("{} answered with a body that is not JSON: {error}", self.url))
            })?,
        };
        read_json_rpc_result(&message)
    }

    async fn end_session(&self) {
        let Some(session_id) = self.session_id.borrow().clone() else {
            return;
        };
        let mut headers: IndexMap<String, String> = self
            .headers
            .iter()
            .filter(|(name, _)| !name.eq_ignore_ascii_case(SESSION_HEADER))
            .map(|(name, value)| (name.clone(), value.clone()))
            .collect();
        headers.insert(SESSION_HEADER.to_owned(), session_id);
        let request = HttpRequest {
            url: self.url.clone(),
            method: HttpMethod::Delete,
            headers,
            body: None,
        };
        if let Err(error) = self.http.send(&request, REQUEST_TIMEOUT).await {
            (self.warn)(&format!(
                "usemcpkit: could not end the session with {}: {error}",
                self.url
            ));
        }
    }
}

impl McpTransport for HttpTransport {
    fn request<'a>(&'a self, method: &'a str, params: Option<Value>) -> LocalFuture<'a, Result<Value, UpstreamError>> {
        Box::pin(self.send_request(method, params))
    }

    fn notify<'a>(&'a self, method: &'a str, params: Option<Value>) -> LocalFuture<'a, Result<(), UpstreamError>> {
        Box::pin(async move {
            self.post(&create_json_rpc_message(None, method, params)).await?;
            Ok(())
        })
    }

    fn is_open(&self) -> bool {
        true
    }

    fn close(&self) -> LocalFuture<'_, ()> {
        Box::pin(self.end_session())
    }
}
