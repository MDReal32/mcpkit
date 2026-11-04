use crate::request_body::RequestBody;
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};
use usemcpkit_manifest::tool::HttpMethod;

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct HttpRequest {
    pub url: String,
    pub method: HttpMethod,
    /// In the order they were merged; names are kept as written, so two spellings of one name are both sent.
    pub headers: IndexMap<String, String>,
    pub body: Option<RequestBody>,
}
