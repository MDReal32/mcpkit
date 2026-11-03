use crate::AuthError;
use crate::oauth::pkce::authorization_request::AuthorizationRequest;
use crate::oauth::pkce::set_search_param::set_search_param;
use mcpkit_manifest::auth::OAuthAuth;
use url::Url;

/// The URL the user opens to approve access: the entry's own params, then the PKCE authorization code request.
pub fn build_authorization_url(auth: &OAuthAuth, request: &AuthorizationRequest) -> Result<String, AuthError> {
    let mut url = Url::parse(&auth.authorization_url)
        .map_err(|error| AuthError(format!("Invalid URL {}: {error}", auth.authorization_url)))?;
    let mut params: Vec<(String, String)> = url.query_pairs().into_owned().collect();
    for (name, value) in auth.authorization_params.iter().flatten() {
        set_search_param(&mut params, name, value);
    }
    set_search_param(&mut params, "response_type", "code");
    set_search_param(&mut params, "client_id", &auth.client_id);
    set_search_param(&mut params, "redirect_uri", request.redirect_uri);
    set_search_param(&mut params, "code_challenge", request.challenge);
    set_search_param(&mut params, "code_challenge_method", "S256");
    set_search_param(&mut params, "state", request.state);
    if let Some(scopes) = auth.scopes.as_ref().filter(|scopes| !scopes.is_empty()) {
        set_search_param(&mut params, "scope", &scopes.join(" "));
    }
    url.query_pairs_mut().clear().extend_pairs(&params);
    Ok(url.to_string())
}

#[cfg(test)]
mod tests {
    use super::build_authorization_url;
    use crate::oauth::pkce::AuthorizationRequest;
    use mcpkit_manifest::auth::OAuthAuth;
    use serde_json::json;

    #[test]
    fn adds_the_pkce_request_after_the_entry_params() {
        let auth: OAuthAuth = serde_json::from_value(json!({
            "authorizationUrl": "https://auth.example.com/authorize?prompt=consent",
            "tokenUrl": "https://auth.example.com/token",
            "clientId": "client-1",
            "scopes": ["repo", "user"],
            "authorizationParams": { "duration": "permanent", "prompt": "none" },
        }))
        .unwrap();
        let request = AuthorizationRequest {
            redirect_uri: "http://127.0.0.1:8976/callback",
            challenge: "c",
            state: "s",
        };

        let url = build_authorization_url(&auth, &request).unwrap();

        assert_eq!(
            url,
            "https://auth.example.com/authorize?prompt=none&duration=permanent&response_type=code&client_id=client-1\
             &redirect_uri=http%3A%2F%2F127.0.0.1%3A8976%2Fcallback&code_challenge=c&code_challenge_method=S256\
             &state=s&scope=repo+user"
        );
    }
}
