use crate::domain::resolve_saved_domain::resolve_saved_domain;
use crate::domain::saved_domain::SavedDomain;
use crate::{AuthContext, AuthError};
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::domain::is_domain_value;

/// The host of a call, in this order: its env var; the host this project was bound to; the known host the project's
/// git remote points at (when the manifest asks for it); the only host in use, or the manifest default. With several
/// hosts and no way to tell, it is `None` so the form asks.
pub async fn resolve_domain(manifest: &Manifest, context: &AuthContext) -> Result<Option<String>, AuthError> {
    let Some(domain) = &manifest.domain else {
        return Ok(None);
    };
    let from_env = domain
        .env
        .as_deref()
        .and_then(|name| context.env.get_non_empty(name))
        .map(str::to_owned);
    let saved = match from_env {
        Some(_) => None,
        None => match resolve_saved_domain(manifest, context).await? {
            SavedDomain::Undecided => return Ok(None),
            SavedDomain::None => None,
            SavedDomain::Host(host) => Some(host).filter(|host| !host.is_empty()),
        },
    };
    let value = from_env.or(saved).or_else(|| domain.default.clone());
    if let Some(value) = &value
        && !is_domain_value(value)
    {
        return Err(AuthError(format!(
            "{}: domain \"{value}\" must look like host[:port][/path]",
            manifest.name
        )));
    }
    Ok(value)
}
