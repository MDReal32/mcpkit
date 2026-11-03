use crate::cli_detection::find_command::find_command;
use mcpkit_auth::AuthError;
use mcpkit_auth::credentials::CredentialRequest;
use mcpkit_core::env::Env;
use mcpkit_manifest::ui::UiAction;
use std::collections::BTreeSet;

/// Drops CLI buttons whose program is not on PATH, before the page sees the request, so action indexes stay valid.
pub async fn keep_installed_cli_actions(
    mut request: CredentialRequest,
    env: &Env,
) -> Result<CredentialRequest, AuthError> {
    let commands: BTreeSet<String> = request
        .options
        .iter()
        .flat_map(|option| &option.actions)
        .filter_map(|action| match action {
            UiAction::Cli { command, .. } => Some(command.clone()),
            UiAction::Link { .. } => None,
        })
        .collect();
    let mut installed = BTreeSet::new();
    for command in commands {
        if find_command(&command, env).await?.is_some() {
            installed.insert(command);
        }
    }
    for option in &mut request.options {
        option.actions.retain(|action| match action {
            UiAction::Cli { command, .. } => installed.contains(command),
            UiAction::Link { .. } => true,
        });
    }
    Ok(request)
}
