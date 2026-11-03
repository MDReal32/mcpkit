use crate::client_definition::ClientDefinition;
use crate::client_error::ClientError;
use crate::config::{has_json_entry, has_toml_table, parse_json_config};
use crate::config_format::ConfigFormat;
use crate::consts::ENTRY_NAME;
use std::path::Path;

pub fn has_client_entry(definition: &ClientDefinition, text: &str, path: &Path) -> Result<bool, ClientError> {
    match definition.format {
        ConfigFormat::Toml => Ok(has_toml_table(text, definition.servers_path, ENTRY_NAME)),
        ConfigFormat::Json => Ok(has_json_entry(
            &parse_json_config(text, path)?,
            definition.servers_path,
            ENTRY_NAME,
        )),
    }
}
