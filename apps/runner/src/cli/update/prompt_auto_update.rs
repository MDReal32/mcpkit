use crate::cli::consts::AUTO_UPDATE_QUESTION;
use std::io::ErrorKind;

/// Asks whether usemcpkit keeps itself up to date, `Yes` first. `None` when the user cancels.
pub fn prompt_auto_update() -> Result<Option<bool>, String> {
    match cliclack::confirm(AUTO_UPDATE_QUESTION).initial_value(true).interact() {
        Ok(auto_update) => Ok(Some(auto_update)),
        Err(error) if error.kind() == ErrorKind::Interrupted => Ok(None),
        Err(error) => Err(format!("cannot ask about auto-update: {error}")),
    }
}
