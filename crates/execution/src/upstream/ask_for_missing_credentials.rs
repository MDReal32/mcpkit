use crate::upstream::request_forwarded_credentials::request_forwarded_credentials;
use indexmap::IndexMap;
use usemcpkit_auth::{AuthContext, AuthError};
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::upstream::StdioUpstream;

/// The values the user enters for `missing`; without a form to ask in, the missing names are the error.
pub async fn ask_for_missing_credentials(
    manifest: &Manifest,
    upstream: &StdioUpstream,
    missing: &[String],
    context: &AuthContext,
) -> Result<IndexMap<String, String>, AuthError> {
    let Some(requester) = &context.request_credentials else {
        return Err(AuthError(format!(
            "{}: missing credential, set {} in the client's env for usemcpkit",
            manifest.name,
            missing.join(", ")
        )));
    };
    request_forwarded_credentials(manifest, upstream, missing, context, requester).await
}
