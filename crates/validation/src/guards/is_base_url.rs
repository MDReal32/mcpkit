use crate::guards::consts::DOMAIN_SAMPLE_VALUE;
use crate::guards::is_https_url::is_https_url;
use serde_json::Value;
use url::Url;
use usemcpkit_manifest::domain::fill_domain;

/// An `https://` URL that parses once `{domain}` is filled in, like `URL.canParse` (the `url` crate follows the same
/// WHATWG URL standard).
pub fn is_base_url(value: Option<&Value>) -> bool {
    is_https_url(value)
        && value
            .and_then(Value::as_str)
            .is_some_and(|text| Url::parse(&fill_domain(text, DOMAIN_SAMPLE_VALUE)).is_ok())
}
