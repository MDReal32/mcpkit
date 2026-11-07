use url::Url;

/// The urls a well-known document may be served from for `target`, the path-aware one first (RFC 8414 and RFC 9728
/// put the well-known segment between the host and the path).
pub fn list_well_known_urls(target: &Url, well_known: &str) -> Vec<String> {
    let origin = target.origin().ascii_serialization();
    let path = target.path().trim_end_matches('/');
    let mut urls = Vec::new();
    if !path.is_empty() {
        urls.push(format!("{origin}{well_known}{path}"));
    }
    urls.push(format!("{origin}{well_known}"));
    urls
}
