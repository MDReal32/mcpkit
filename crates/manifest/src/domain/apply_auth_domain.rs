use crate::auth::{AuthSpec, OAuthAuth};
use crate::domain::fill_domain::fill_domain;

pub fn apply_auth_domain(auth: &AuthSpec, domain: &str) -> AuthSpec {
    let AuthSpec::OAuth(oauth) = auth else {
        return auth.clone();
    };
    AuthSpec::OAuth(OAuthAuth {
        authorization_url: fill_domain(&oauth.authorization_url, domain),
        token_url: fill_domain(&oauth.token_url, domain),
        ..oauth.clone()
    })
}
