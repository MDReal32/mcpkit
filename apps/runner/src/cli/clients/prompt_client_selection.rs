use crate::cli::clients::client_selection_mode::ClientSelectionMode;
use crate::cli::clients::describe_client::describe_client;
use std::io::ErrorKind;
use std::path::Path;
use usemcpkit_clients::DetectedClient;

/// A checklist of the candidates, all checked. A client whose config cannot be read is named above it instead of being
/// offered, since the checklist has no disabled items. `None` when the user cancels.
pub fn prompt_client_selection(
    candidates: Vec<DetectedClient>,
    mode: ClientSelectionMode,
    home_dir: &Path,
) -> Result<Option<Vec<DetectedClient>>, String> {
    let (usable, broken): (Vec<_>, Vec<_>) = candidates.into_iter().partition(|client| client.problem.is_none());
    for client in &broken {
        cliclack::log::warning(format!(
            "{}: {}",
            client.definition.name,
            describe_client(client, home_dir)
        ))
        .map_err(|error| format!("cannot write to the terminal: {error}"))?;
    }
    if usable.is_empty() {
        return Ok(Some(Vec::new()));
    }
    let initial: Vec<&str> = usable.iter().map(|client| client.definition.id).collect();
    let mut prompt = cliclack::multiselect(mode.message())
        .required(false)
        .initial_values(initial);
    for client in &usable {
        let label = if client.has_entry && mode == ClientSelectionMode::Install {
            format!("{} (update)", client.definition.name)
        } else {
            client.definition.name.to_owned()
        };
        prompt = prompt.item(client.definition.id, label, describe_client(client, home_dir));
    }
    match prompt.interact() {
        Ok(ids) => Ok(Some(
            usable
                .into_iter()
                .filter(|client| ids.contains(&client.definition.id))
                .collect(),
        )),
        Err(error) if error.kind() == ErrorKind::Interrupted => Ok(None),
        Err(error) => Err(format!("cannot ask which clients to change: {error}")),
    }
}
