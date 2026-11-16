use serde_json::{Map, Value};

/// The URLs that may contain `{domain}`: `baseUrl`, the oauth endpoints and `discovery` url of the manifest's and of an
/// HTTP upstream's own `auth`, and the upstream's `url`.
pub fn read_templatable_urls(manifest: &Map<String, Value>) -> Vec<&str> {
    let upstream_auth = manifest
        .get("upstream")
        .and_then(Value::as_object)
        .and_then(|upstream| upstream.get("auth"));
    let auth_entries = [manifest.get("auth"), upstream_auth]
        .into_iter()
        .flatten()
        .filter_map(Value::as_array)
        .flatten()
        .filter_map(Value::as_object);
    let auth_urls = auth_entries.flat_map(|auth| {
        [
            auth.get("authorizationUrl"),
            auth.get("tokenUrl"),
            auth.get("discovery"),
        ]
    });
    let upstream_url = manifest
        .get("upstream")
        .and_then(Value::as_object)
        .filter(|upstream| upstream.get("type").and_then(Value::as_str) == Some("http"))
        .and_then(|upstream| upstream.get("url"));
    [manifest.get("baseUrl"), upstream_url]
        .into_iter()
        .chain(auth_urls)
        .filter_map(|url| url.and_then(Value::as_str))
        .collect()
}
