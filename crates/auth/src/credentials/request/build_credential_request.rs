use crate::credentials::CredentialRequest;
use crate::credentials::request::build_domain_field::build_domain_field;
use crate::credentials::request::to_credential_option::to_credential_option;
use crate::ui::build_ui_texts;
use usemcpkit_core::env::Env;
use usemcpkit_manifest::Manifest;

/// What the credentials page shows for the server: its texts, the domain field, the fallback entries to fill in and
/// whether it can sign in.
pub fn build_credential_request(
    manifest: &Manifest,
    domain: Option<&str>,
    known_hosts: Vec<String>,
    env: &Env,
) -> CredentialRequest {
    let auth = manifest.auth.as_deref().unwrap_or_default();
    let texts = build_ui_texts(manifest);
    CredentialRequest {
        server_name: manifest.name.clone(),
        domain: build_domain_field(manifest, domain, known_hosts, env, &texts),
        domain_in_use: domain.map(str::to_owned),
        options: auth
            .iter()
            .enumerate()
            .filter_map(|(index, entry)| to_credential_option(entry, index, &manifest.name, &texts))
            .collect(),
        sign_in: auth.iter().any(|entry| entry.is_interactive()),
        texts,
    }
}
