use serde_json::Value;

/// The path every endpoint of the document sits under: the path of its first server url (`https://{host}/api/v4` gives
/// `/api/v4`), without a trailing slash; empty when there is none.
pub fn read_base_path(document: &Value) -> String {
    let Some(url) = document
        .get("servers")
        .and_then(Value::as_array)
        .and_then(|servers| servers.first())
        .and_then(|server| server.get("url"))
        .and_then(Value::as_str)
    else {
        return String::new();
    };
    let path = match url.find("://") {
        Some(scheme_end) => {
            let after_scheme = &url[scheme_end + 3..];
            after_scheme.find('/').map_or("", |slash| &after_scheme[slash..])
        }
        None => url,
    };
    path.trim_end_matches('/').to_owned()
}
