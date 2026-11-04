use serde_json::{Map, Value};

/// The URLs that may contain `{domain}`: `baseUrl` and the oauth endpoints.
pub fn read_templatable_urls(manifest: &Map<String, Value>) -> Vec<&str> {
    let auth_entries = manifest
        .get("auth")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .filter_map(Value::as_object);
    let auth_urls = auth_entries.flat_map(|auth| [auth.get("authorizationUrl"), auth.get("tokenUrl")]);
    [manifest.get("baseUrl")]
        .into_iter()
        .chain(auth_urls)
        .filter_map(|url| url.and_then(Value::as_str))
        .collect()
}
