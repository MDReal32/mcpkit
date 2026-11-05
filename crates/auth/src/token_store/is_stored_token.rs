use serde_json::Value;

/// Like the TypeScript check, an optional field sent as `null` makes the token invalid.
pub fn is_stored_token(value: &Value) -> bool {
    let Some(token) = value.as_object() else {
        return false;
    };
    let is_optional = |key: &str, is_type: fn(&Value) -> bool| token.get(key).is_none_or(is_type);
    token.get("accessToken").is_some_and(Value::is_string)
        && token.get("tokenType").is_some_and(Value::is_string)
        && is_optional("refreshToken", Value::is_string)
        && is_optional("expiresAt", Value::is_number)
        && is_optional("scope", Value::is_string)
        && is_optional("authKey", Value::is_string)
}
