use crate::client_definition::ClientDefinition;
use crate::client_error::ClientError;
use crate::config::{read_config_text, remove_json_entry, remove_toml_table, write_config_text};
use crate::config_format::ConfigFormat;
use crate::consts::ENTRY_NAME;
use crate::entry::has_client_entry::has_client_entry;
use std::path::Path;

/// `false` when the file has no `mcpkit` entry, without touching it.
pub fn remove_client_entry(definition: &ClientDefinition, path: &Path) -> Result<bool, ClientError> {
    let text = read_config_text(path)?;
    if !has_client_entry(definition, &text, path)? {
        return Ok(false);
    }
    let updated = match definition.format {
        ConfigFormat::Toml => remove_toml_table(&text, definition.servers_path, ENTRY_NAME),
        ConfigFormat::Json => remove_json_entry(&text, definition.servers_path, ENTRY_NAME)?,
    };
    write_config_text(path, &updated)?;
    Ok(true)
}
