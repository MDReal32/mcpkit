use crate::cli::command::InstallArgs;
use crate::cli::tool_loading::prompt_partial_loading::prompt_partial_loading;
use std::io::IsTerminal;

/// `--partial-loading` decides; without it the user is asked, unless `--all`/`--clients` asked for no questions or there
/// is no terminal, which keeps every tool listed. `None` when the user cancels.
pub fn choose_partial_loading(args: &InstallArgs) -> Result<Option<bool>, String> {
    if let Some(partial) = args.partial_loading {
        return Ok(Some(partial));
    }
    let asks_nothing = args.selection.all || args.selection.clients.is_some();
    if asks_nothing || !std::io::stdin().is_terminal() {
        return Ok(Some(false));
    }
    prompt_partial_loading()
}
