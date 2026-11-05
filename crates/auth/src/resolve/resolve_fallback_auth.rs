use crate::resolve::read_fallback_values::read_fallback_values;
use crate::resolve::resolve_static_auth::resolve_static_auth;
use crate::{AuthContext, AuthError, ResolvedAuth, SecretOwner, ServerKey};
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::auth::AuthSpec;

pub async fn resolve_fallback_auth(
    auth: &AuthSpec,
    manifest: &Manifest,
    domain: Option<&str>,
    context: &AuthContext,
) -> Result<ResolvedAuth, AuthError> {
    let owner = SecretOwner {
        server: ServerKey::of(manifest),
        domain: domain.map(str::to_owned),
    };
    let values = read_fallback_values(auth, &owner, context).await?;
    resolve_static_auth(auth, &manifest.name, &values)
}
