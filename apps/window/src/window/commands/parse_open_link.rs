use crate::window::consts::WINDOW_LINK_SCHEMES;
use url::Url;

/// The link as one URL when it is http(s); None for anything else.
pub fn parse_open_link(link: &str) -> Option<String> {
    let url = Url::parse(link).ok()?;
    WINDOW_LINK_SCHEMES.contains(&url.scheme()).then(|| url.to_string())
}

#[cfg(test)]
mod tests {
    use super::parse_open_link;

    #[test]
    fn opens_only_http_links() {
        assert_eq!(
            parse_open_link("https://github.com/settings/tokens"),
            Some("https://github.com/settings/tokens".into())
        );
        assert_eq!(parse_open_link("file:///etc/passwd"), None);
        assert_eq!(parse_open_link("not a url"), None);
    }
}
