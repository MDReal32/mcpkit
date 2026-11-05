use crate::client_definition::ClientDefinition;
use crate::client_error::ClientError;
use crate::config::{read_config_text, write_config_text};
use crate::entry::owned_entry_names::owned_entry_names;
use crate::entry::remove_named_entries::remove_named_entries;
use std::path::Path;

/// Removes the `usemcpkit` entry and any older-named one; `false` when the file has neither, without touching it.
pub fn remove_client_entry(definition: &ClientDefinition, path: &Path) -> Result<bool, ClientError> {
    let text = read_config_text(path)?;
    let (updated, removed) = remove_named_entries(definition, &text, path, &owned_entry_names())?;
    if !removed {
        return Ok(false);
    }
    write_config_text(path, &updated)?;
    Ok(true)
}
