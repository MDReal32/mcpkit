use crate::credentials::FormAnswer;
use crate::resolve::resolve_signed_in_auth;
use crate::{AuthContext, AuthError, AuthResolution};
use indexmap::IndexMap;
use mcpkit_manifest::Manifest;
use std::rc::Rc;

/// The browser sign-in against the domain chosen in the form, which is remembered once the API accepts the token.
pub async fn resolve_form_sign_in(
    manifest: Rc<Manifest>,
    domain: Option<String>,
    context: &AuthContext,
) -> Result<AuthResolution, AuthError> {
    let Some(oauth) = manifest.auth.iter().flatten().find_map(|auth| auth.as_interactive()) else {
        return Err(AuthError(format!("{}: this server has no sign-in", manifest.name)));
    };
    let resolved = resolve_signed_in_auth(&manifest.name, oauth, context).await?;
    Ok(AuthResolution {
        auth: resolved,
        save: Some(FormAnswer {
            values: IndexMap::new(),
            domain,
        }),
        manifest,
    })
}
