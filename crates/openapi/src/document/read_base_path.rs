use serde_json::Value;

/// The path every endpoint of the document sits under: the path of its first server url (`https://{host}/api/v4` and
/// `//{host}/api/v4` give `/api/v4`), without a trailing slash; empty when there is none.
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
    let authority = match (url.find("://"), url.strip_prefix("//")) {
        (Some(scheme_end), _) => Some(&url[scheme_end + 3..]),
        (None, Some(after_slashes)) => Some(after_slashes),
        (None, None) => None,
    };
    let path = match authority {
        Some(authority) => authority.find('/').map_or("", |slash| &authority[slash..]),
        None => url,
    };
    path.trim_end_matches('/').to_owned()
}

#[cfg(test)]
mod tests {
    use super::read_base_path;
    use serde_json::json;

    #[test]
    fn reads_the_path_of_the_first_server() {
        let path = |url: &str| read_base_path(&json!({ "servers": [{ "url": url }] }));
        assert_eq!(path("https://{host}/api/v4/"), "/api/v4");
        assert_eq!(path("//your-domain.atlassian.net"), "");
        assert_eq!(path("//example.com/wiki"), "/wiki");
        assert_eq!(path("/rest"), "/rest");
        assert_eq!(read_base_path(&json!({})), "");
    }
}
