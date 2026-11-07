use url::Url;

/// The origin of the form API and the session token of `http://127.0.0.1:<port>/#<token>`.
pub fn parse_form_url(url: &str) -> Result<(String, String), String> {
    let parsed = Url::parse(url).map_err(|error| format!("{url} is not a URL: {error}"))?;
    if parsed.scheme() != "http" || parsed.host_str().is_none() {
        return Err(format!("{url} is not an http URL with a host"));
    }
    let session = parsed
        .fragment()
        .filter(|token| !token.is_empty())
        .ok_or_else(|| format!("{url} has no session token in its fragment"))?;
    Ok((parsed.origin().ascii_serialization(), session.to_owned()))
}

#[cfg(test)]
mod tests {
    use super::parse_form_url;

    #[test]
    fn splits_the_origin_from_the_token() {
        assert_eq!(
            parse_form_url("http://127.0.0.1:51234/#abc-123"),
            Ok(("http://127.0.0.1:51234".into(), "abc-123".into()))
        );
    }

    #[test]
    fn refuses_what_is_not_a_form_url() {
        assert!(parse_form_url("not a url").is_err());
        assert!(parse_form_url("file:///etc/passwd#x").is_err());
        assert!(parse_form_url("http://127.0.0.1:1/").is_err());
    }
}
