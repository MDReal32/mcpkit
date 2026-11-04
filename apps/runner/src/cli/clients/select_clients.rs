use crate::cli::clients::client_selection_mode::ClientSelectionMode;
use crate::cli::clients::find_requested_clients::find_requested_clients;
use crate::cli::clients::prompt_client_selection::prompt_client_selection;
use crate::cli::command::ClientSelection;
use crate::cli::consts::{ALL_FLAG, CLIENTS_FLAG};
use mcpkit_clients::DetectedClient;
use std::io::IsTerminal;
use std::path::Path;

/// `--clients` and `--all` skip the checklist; without them a terminal is required. `None` when the user cancels.
pub fn select_clients(
    candidates: Vec<DetectedClient>,
    selection: &ClientSelection,
    mode: ClientSelectionMode,
    home_dir: &Path,
) -> Result<Option<Vec<DetectedClient>>, String> {
    if let Some(clients) = &selection.clients {
        return find_requested_clients(candidates, clients).map(Some);
    }
    if selection.all {
        return Ok(Some(
            candidates
                .into_iter()
                .filter(|client| client.problem.is_none())
                .collect(),
        ));
    }
    if !std::io::stdin().is_terminal() {
        return Err(format!(
            "no terminal to ask which clients to change: pass {ALL_FLAG} or {CLIENTS_FLAG} <id,id>"
        ));
    }
    prompt_client_selection(candidates, mode, home_dir)
}
