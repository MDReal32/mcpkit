use crate::config::save_server_domain;
use crate::credentials::FormAnswer;
use crate::project::resolve_project;
use crate::{AuthContext, AuthError, SecretOwner, ServerKey};
use usemcpkit_manifest::Manifest;

/// Credentials go to the secret store under their host; the host is remembered for the project that asked for it.
pub async fn save_form_answer(
    manifest: &Manifest,
    answer: &FormAnswer,
    context: &AuthContext,
) -> Result<(), AuthError> {
    let server = ServerKey::of(manifest);
    if let Some(store) = &context.secret_store {
        let owner = SecretOwner {
            server: server.clone(),
            domain: answer.domain.clone(),
        };
        for (key, value) in &answer.values {
            store.set(&owner, key, value).await?;
        }
    }
    let Some(domain) = &answer.domain else {
        return Ok(());
    };
    let project = match &context.project_dir {
        Some(directory) => Some(resolve_project(directory).await),
        None => None,
    };
    let project_key = project.as_ref().map(|project| project.key.as_str());
    save_server_domain(&context.home, &server, domain, project_key).await?;
    Ok(())
}
