use crate::cli::consts::PARTIAL_LOADING_QUESTION;
use std::io::ErrorKind;

/// Asks whether to turn on the beta partial loading, `No` first. `None` when the user cancels.
pub fn prompt_partial_loading() -> Result<Option<bool>, String> {
    match cliclack::confirm(PARTIAL_LOADING_QUESTION)
        .initial_value(false)
        .interact()
    {
        Ok(partial) => Ok(Some(partial)),
        Err(error) if error.kind() == ErrorKind::Interrupted => Ok(None),
        Err(error) => Err(format!("cannot ask about partial loading: {error}")),
    }
}
