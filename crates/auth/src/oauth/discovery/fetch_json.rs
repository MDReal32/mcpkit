use crate::AuthContext;
use crate::oauth::discovery::consts::DISCOVERY_TIMEOUT;
use indexmap::IndexMap;
use serde_json::Value;
use usemcpkit_http::HttpRequest;
use usemcpkit_manifest::tool::HttpMethod;

/// The JSON a well-known url answers, or `None` when it answers anything else: a server publishes only some of the
/// locations discovery tries.
pub async fn fetch_json(url: &str, context: &AuthContext) -> Option<Value> {
    let request = HttpRequest {
        url: url.to_owned(),
        method: HttpMethod::Get,
        headers: IndexMap::from([("Accept".to_owned(), "application/json".to_owned())]),
        body: None,
    };
    let response = context.http.send(&request, DISCOVERY_TIMEOUT).await.ok()?;
    if !response.is_ok() {
        return None;
    }
    serde_json::from_str(&response.text()).ok()
}
