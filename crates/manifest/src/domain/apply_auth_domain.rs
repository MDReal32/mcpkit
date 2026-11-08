use crate::auth::{AuthSpec, OAuthAuth};
use crate::domain::fill_domain_url::fill_domain_url;

pub fn apply_auth_domain(auth: &AuthSpec, domain: &str, loopback_http: bool) -> AuthSpec {
    let AuthSpec::OAuth(oauth) = auth else {
        return auth.clone();
    };
    AuthSpec::OAuth(OAuthAuth {
        authorization_url: fill_domain_url(&oauth.authorization_url, domain, loopback_http),
        token_url: fill_domain_url(&oauth.token_url, domain, loopback_http),
        discovery: oauth
            .discovery
            .as_ref()
            .map(|discovery| fill_domain_url(discovery, domain, loopback_http)),
        ..oauth.clone()
    })
}

#[cfg(test)]
mod tests {
    use super::apply_auth_domain;
    use crate::auth::AuthSpec;
    use serde_json::json;

    fn discovery_of(auth: &AuthSpec) -> Option<String> {
        match auth {
            AuthSpec::OAuth(oauth) => oauth.discovery.clone(),
            _ => None,
        }
    }

    #[test]
    fn fills_the_discovery_url() {
        let auth: AuthSpec =
            serde_json::from_value(json!({ "type": "oauth", "discovery": "https://{domain}/mcp" })).unwrap();
        assert_eq!(
            discovery_of(&apply_auth_domain(&auth, "acme.example.com/n8n", false)).as_deref(),
            Some("https://acme.example.com/n8n/mcp")
        );
    }

    #[test]
    fn discovers_a_loopback_domain_over_http_when_allowed() {
        let auth: AuthSpec =
            serde_json::from_value(json!({ "type": "oauth", "discovery": "https://{domain}/mcp" })).unwrap();
        assert_eq!(
            discovery_of(&apply_auth_domain(&auth, "localhost:5678", true)).as_deref(),
            Some("http://localhost:5678/mcp")
        );
        assert_eq!(
            discovery_of(&apply_auth_domain(&auth, "localhost:5678", false)).as_deref(),
            Some("https://localhost:5678/mcp")
        );
    }
}
