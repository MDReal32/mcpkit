use crate::{AuthContext, AuthError, SecretOwner};
use usemcpkit_core::env::Env;
use usemcpkit_manifest::auth::AuthSpec;

/// Each credential from its env var, else from the secret store; one found in neither is left out.
pub async fn read_fallback_values(
    auth: &AuthSpec,
    owner: &SecretOwner,
    context: &AuthContext,
) -> Result<Env, AuthError> {
    let mut values = Vec::new();
    for name in auth.env_names() {
        let value = match (context.env.get_non_empty(name), &context.secret_store) {
            (Some(value), _) => Some(value.to_owned()),
            (None, Some(store)) => store.get(owner, name).await?,
            (None, None) => None,
        };
        if let Some(value) = value {
            values.push((name, value));
        }
    }
    Ok(Env::from_pairs(values))
}
