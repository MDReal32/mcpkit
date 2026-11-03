use crate::resolve::encode_basic_credentials::encode_basic_credentials;
use crate::resolve::read_secret::read_secret;
use crate::{AuthError, ResolvedAuth};
use indexmap::IndexMap;
use mcpkit_core::env::Env;
use mcpkit_core::js::to_js_json;
use mcpkit_manifest::auth::AuthSpec;

/// Builds a fallback entry's auth from its credential values, keyed by env var name.
pub fn resolve_static_auth(auth: &AuthSpec, server_name: &str, values: &Env) -> Result<ResolvedAuth, AuthError> {
    let secret = |env_name: &str| read_secret(values, env_name, server_name);
    let headers = |name: &str, value: String| IndexMap::from([(name.to_owned(), value)]);
    let resolved = match auth {
        AuthSpec::None => ResolvedAuth::default(),
        AuthSpec::Bearer(bearer) => ResolvedAuth {
            headers: headers("Authorization", format!("Bearer {}", secret(&bearer.env)?)),
            query: IndexMap::new(),
        },
        AuthSpec::Header(header) => {
            let prefix = header.prefix.as_deref().unwrap_or_default();
            ResolvedAuth {
                headers: headers(&header.name, format!("{prefix}{}", secret(&header.env)?)),
                query: IndexMap::new(),
            }
        }
        AuthSpec::Query(query) => ResolvedAuth {
            headers: IndexMap::new(),
            query: IndexMap::from([(query.name.clone(), secret(&query.env)?)]),
        },
        AuthSpec::Basic(basic) => {
            let username = secret(&basic.username_env)?;
            let password = secret(&basic.password_env)?;
            ResolvedAuth {
                headers: headers("Authorization", encode_basic_credentials(&username, &password)),
                query: IndexMap::new(),
            }
        }
        AuthSpec::OAuth(_) => {
            let spec = serde_json::to_value(auth).map_err(|error| AuthError(error.to_string()))?;
            return Err(AuthError(format!(
                "{server_name}: unsupported auth {}",
                to_js_json(&spec)
            )));
        }
    };
    Ok(resolved)
}

#[cfg(test)]
mod tests {
    use super::resolve_static_auth;
    use crate::ResolvedAuth;
    use base64::Engine;
    use base64::engine::general_purpose::STANDARD;
    use indexmap::IndexMap;
    use mcpkit_core::env::Env;
    use mcpkit_manifest::auth::AuthSpec;
    use serde_json::json;

    fn spec(value: serde_json::Value) -> AuthSpec {
        serde_json::from_value(value).unwrap()
    }

    fn header(name: &str, value: &str) -> IndexMap<String, String> {
        IndexMap::from([(name.to_owned(), value.to_owned())])
    }

    #[test]
    fn builds_headers_and_query_params_per_static_strategy() {
        let env = Env::from_pairs([("TOKEN", "secret")]);
        let resolve = |value| resolve_static_auth(&spec(value), "x", &env).unwrap();

        assert_eq!(
            resolve(json!({ "type": "bearer", "env": "TOKEN" })).headers,
            header("Authorization", "Bearer secret")
        );
        assert_eq!(
            resolve(json!({ "type": "header", "env": "TOKEN", "name": "X-Key", "prefix": "k " })).headers,
            header("X-Key", "k secret")
        );
        assert_eq!(
            resolve(json!({ "type": "query", "env": "TOKEN", "name": "key" })).query,
            header("key", "secret")
        );
        assert_eq!(
            resolve(json!({ "type": "basic", "usernameEnv": "TOKEN", "passwordEnv": "TOKEN" })).headers,
            header("Authorization", &format!("Basic {}", STANDARD.encode("secret:secret")))
        );
        assert_eq!(resolve(json!({ "type": "none" })), ResolvedAuth::default());
    }

    #[test]
    fn fails_with_a_clear_error_when_the_secret_env_var_is_missing() {
        let error = resolve_static_auth(
            &spec(json!({ "type": "bearer", "env": "NOPE" })),
            "demo",
            &Env::default(),
        )
        .unwrap_err();

        assert_eq!(
            error.0,
            "demo: missing credential, set the NOPE environment variable or enter it in the credentials form"
        );
    }
}
