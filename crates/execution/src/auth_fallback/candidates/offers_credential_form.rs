use crate::CallContext;
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::auth::AuthSpec;

/// The form is shown when the user can enter a credential, or choose a domain to sign in to.
pub fn offers_credential_form(manifest: &Manifest, context: &CallContext) -> bool {
    let auth = manifest.auth.as_deref().unwrap_or_default();
    let takes_credentials = auth
        .iter()
        .any(|entry| !entry.is_interactive() && !matches!(entry, AuthSpec::None));
    let chooses_sign_in_domain = manifest.domain.is_some() && auth.iter().any(AuthSpec::is_interactive);
    context.auth.request_credentials.is_some() && (takes_credentials || chooses_sign_in_domain)
}
