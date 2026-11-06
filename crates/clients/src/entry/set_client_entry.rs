use crate::client_definition::ClientDefinition;
use crate::client_error::ClientError;
use crate::config::{parse_json_config, read_config_text, upsert_json_entry, upsert_toml_table, write_config_text};
use crate::config_format::ConfigFormat;
use crate::consts::{ENTRY_NAME, LEGACY_ENTRY_NAMES};
use crate::entry::remove_named_entries::remove_named_entries;
use crate::launch_command::LaunchCommand;
use serde_json::Value;
use std::path::Path;

/// Writes the single `mcpkit` entry and drops an older-named one, so the client never starts two; every other key
/// in the file is left as it was.
pub fn set_client_entry(definition: &ClientDefinition, path: &Path, launch: &LaunchCommand) -> Result<(), ClientError> {
    let text = read_config_text(path)?;
    let entry = (definition.create_entry)(launch);
    let upserted = match definition.format {
        ConfigFormat::Toml => upsert_toml_table(&text, definition.servers_path, ENTRY_NAME, &entry, path)?,
        ConfigFormat::Json => {
            parse_json_config(&text, path)?;
            upsert_json_entry(&text, definition.servers_path, ENTRY_NAME, &Value::Object(entry))?
        }
    };
    let (updated, _) = remove_named_entries(definition, &upserted, path, LEGACY_ENTRY_NAMES)?;
    write_config_text(path, &updated)
}
