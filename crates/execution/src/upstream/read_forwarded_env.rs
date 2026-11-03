use crate::upstream::ask_for_missing_credentials::ask_for_missing_credentials;
use crate::upstream::forwarded_env::ForwardedEnv;
use crate::upstream::read_forwarded_value::read_forwarded_value;
use indexmap::IndexMap;
use mcpkit_auth::{AuthContext, AuthError, SecretOwner, ServerKey};
use mcpkit_manifest::Manifest;
use mcpkit_manifest::upstream::StdioUpstream;

/// Each forwarded credential from its env var, else from the secret store; an optional one is left out when unset.
/// A required one found nowhere is asked for in the credentials form when the caller has one, and `commit` saves what
/// was entered once the upstream has started with it.
pub async fn read_forwarded_env(
    manifest: &Manifest,
    upstream: &StdioUpstream,
    domain: Option<&str>,
    context: &AuthContext,
) -> Result<ForwardedEnv, AuthError> {
    let owner = SecretOwner {
        server: ServerKey::of(manifest),
        domain: domain.map(str::to_owned),
    };
    let mut env = IndexMap::new();
    let mut missing = Vec::new();
    for name in upstream.forward_env.iter().flatten() {
        match read_forwarded_value(name, &owner, context).await? {
            Some(value) => {
                env.insert(name.clone(), value);
            }
            None => missing.push(name.clone()),
        }
    }
    let entered = match missing.is_empty() {
        true => IndexMap::new(),
        false => ask_for_missing_credentials(manifest, upstream, &missing, context).await?,
    };
    for name in upstream.optional_env.iter().flatten() {
        if let Some(value) = read_forwarded_value(name, &owner, context).await? {
            env.insert(name.clone(), value);
        }
    }
    env.extend(entered.clone());
    Ok(ForwardedEnv { env, entered, owner })
}
