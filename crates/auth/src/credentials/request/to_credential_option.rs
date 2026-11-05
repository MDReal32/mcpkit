use crate::credentials::CredentialOption;
use crate::credentials::request::list_credential_fields::list_credential_fields;
use crate::ui::to_option_actions;
use indexmap::IndexMap;
use usemcpkit_manifest::auth::AuthSpec;

/// The option of a fallback entry that takes values; `None` for the sign-in and for entries without fields.
pub fn to_credential_option(
    auth: &AuthSpec,
    index: usize,
    server_name: &str,
    texts: &IndexMap<String, String>,
) -> Option<CredentialOption> {
    if auth.is_interactive() {
        return None;
    }
    let fields = list_credential_fields(auth, texts);
    if fields.is_empty() {
        return None;
    }
    let label = auth
        .label()
        .filter(|label| !label.is_empty())
        .map_or_else(|| auth.describe(), str::to_owned);
    Some(CredentialOption {
        index,
        label,
        actions: to_option_actions(auth.ui(), server_name, fields.len()),
        fields,
    })
}
