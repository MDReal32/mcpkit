use crate::cli::command::InstallArgs;
use crate::cli::update::prompt_auto_update::prompt_auto_update;
use std::io::IsTerminal;
use usemcpkit_binary::BinaryLayout;

/// A dev build never updates itself, so it asks nothing. Otherwise `--auto-update` decides; without it the user is
/// asked, unless `--all`/`--clients` asked for no questions or there is no terminal, which keeps auto-update on. `None`
/// when the user cancels.
pub fn choose_auto_update(args: &InstallArgs, layout: BinaryLayout) -> Result<Option<bool>, String> {
    if layout == BinaryLayout::Combined {
        return Ok(Some(false));
    }
    if let Some(auto_update) = args.auto_update {
        return Ok(Some(auto_update));
    }
    let asks_nothing = args.selection.all || args.selection.clients.is_some();
    if asks_nothing || !std::io::stdin().is_terminal() {
        return Ok(Some(true));
    }
    prompt_auto_update()
}
