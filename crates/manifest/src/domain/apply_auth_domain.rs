use crate::auth::{AuthSpec, OAuthAuth};
use crate::domain::fill_domain_url::fill_domain_url;

pub fn apply_auth_domain(auth: &AuthSpec, domain: &str, loopback_http: bool) -> AuthSpec {
    let AuthSpec::OAuth(oauth) = auth else {
        return auth.clone();
    };
    AuthSpec::OAuth(OAuthAuth {
        authorization_url: fill_domain_url(&oauth.authorization_url, domain, loopback_http),
        token_url: fill_domain_url(&oauth.token_url, domain, loopback_http),
        ..oauth.clone()
    })
}
