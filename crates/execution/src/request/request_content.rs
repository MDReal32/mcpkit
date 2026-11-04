use indexmap::IndexMap;
use usemcpkit_http::RequestBody;

/// A request body and the headers that describe it.
pub struct RequestContent {
    pub body: RequestBody,
    pub headers: IndexMap<String, String>,
}
