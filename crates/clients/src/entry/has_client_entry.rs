use crate::client_definition::ClientDefinition;
use crate::client_error::ClientError;
use crate::entry::has_named_entry::has_named_entry;
use crate::entry::owned_entry_names::owned_entry_names;
use std::path::Path;

/// `true` when the file has the `usemcpkit` entry or one an older release wrote under its old name.
pub fn has_client_entry(definition: &ClientDefinition, text: &str, path: &Path) -> Result<bool, ClientError> {
    for name in owned_entry_names() {
        if has_named_entry(definition, text, path, name)? {
            return Ok(true);
        }
    }
    Ok(false)
}
