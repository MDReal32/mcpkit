use crate::domain::fill_domain::fill_domain;
use crate::domain::to_loopback_http_url::to_loopback_http_url;

/// A URL template with `{domain}` filled in, over `http://` for a loopback domain when the server allows it
/// (`domain.loopbackHttp`).
pub fn fill_domain_url(template: &str, domain: &str, loopback_http: bool) -> String {
    let url = fill_domain(template, domain);
    if loopback_http {
        to_loopback_http_url(url, domain)
    } else {
        url
    }
}
