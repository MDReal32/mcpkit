use mcpkit_auth::{AuthContext, AuthError, SecretOwner};

/// A forwarded credential from its env var, else from the secret store; an empty value counts as unset.
pub async fn read_forwarded_value(
    name: &str,
    owner: &SecretOwner,
    context: &AuthContext,
) -> Result<Option<String>, AuthError> {
    if let Some(value) = context.env.get_non_empty(name) {
        return Ok(Some(value.to_owned()));
    }
    let Some(store) = &context.secret_store else {
        return Ok(None);
    };
    Ok(store.get(owner, name).await?.filter(|value| !value.is_empty()))
}
