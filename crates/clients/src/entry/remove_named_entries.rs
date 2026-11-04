use crate::client_definition::ClientDefinition;
use crate::client_error::ClientError;
use crate::config::{remove_json_entry, remove_toml_table};
use crate::config_format::ConfigFormat;
use crate::entry::has_named_entry::has_named_entry;
use std::path::Path;

/// The text without the entries of `names` it has, and whether it had any.
pub fn remove_named_entries(
    definition: &ClientDefinition,
    text: &str,
    path: &Path,
    names: &[&str],
) -> Result<(String, bool), ClientError> {
    let mut updated = text.to_owned();
    let mut removed = false;
    for name in names {
        if !has_named_entry(definition, &updated, path, name)? {
            continue;
        }
        updated = match definition.format {
            ConfigFormat::Toml => remove_toml_table(&updated, definition.servers_path, name),
            ConfigFormat::Json => remove_json_entry(&updated, definition.servers_path, name)?,
        };
        removed = true;
    }
    Ok((updated, removed))
}
