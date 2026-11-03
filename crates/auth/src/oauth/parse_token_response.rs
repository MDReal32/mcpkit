use crate::AuthError;
use crate::oauth::consts::{DEFAULT_TOKEN_TYPE, MS_PER_SECOND};
use crate::token_store::StoredToken;
use serde_json::Value;

/// Some providers (GitHub) report token errors with HTTP 200, so the body decides.
pub fn parse_token_response(body: &Value, status: u16, server_name: &str, now: f64) -> Result<StoredToken, AuthError> {
    let Some(body) = body.as_object() else {
        return Err(AuthError(format!(
            "{server_name}: token endpoint returned {status} without a JSON body"
        )));
    };
    let read_string = |key: &str| body.get(key).and_then(Value::as_str).map(str::to_owned);
    if let Some(error) = read_string("error") {
        let detail = read_string("error_description").unwrap_or(error);
        return Err(AuthError(format!("{server_name}: token request failed: {detail}")));
    }
    let Some(access_token) = read_string("access_token") else {
        return Err(AuthError(format!(
            "{server_name}: token endpoint returned {status} without an access_token"
        )));
    };
    Ok(StoredToken {
        access_token,
        token_type: read_string("token_type").unwrap_or_else(|| DEFAULT_TOKEN_TYPE.to_owned()),
        refresh_token: read_string("refresh_token"),
        expires_at: body
            .get("expires_in")
            .and_then(Value::as_f64)
            .map(|expires_in| now + expires_in * MS_PER_SECOND),
        scope: read_string("scope"),
        auth_key: None,
    })
}

#[cfg(test)]
mod tests {
    use super::parse_token_response;
    use serde_json::json;

    #[test]
    fn reads_the_token_and_its_expiry() {
        let body = json!({ "access_token": "a", "refresh_token": "r", "expires_in": 3600, "scope": "repo" });

        let token = parse_token_response(&body, 200, "demo", 1000.0).unwrap();

        assert_eq!(token.token_type, "bearer");
        assert_eq!(token.expires_at, Some(3_601_000.0));
        assert_eq!(token.refresh_token.as_deref(), Some("r"));
    }

    #[test]
    fn reports_errors_sent_with_any_status() {
        let error = |body| parse_token_response(&body, 200, "demo", 0.0).unwrap_err().0;

        assert_eq!(
            error(json!({ "error": "bad", "error_description": "Bad code" })),
            "demo: token request failed: Bad code"
        );
        assert_eq!(error(json!({ "error": "bad" })), "demo: token request failed: bad");
        assert_eq!(
            error(json!([])),
            "demo: token endpoint returned 200 without a JSON body"
        );
        assert_eq!(
            error(json!({ "token_type": "bearer" })),
            "demo: token endpoint returned 200 without an access_token"
        );
    }
}
