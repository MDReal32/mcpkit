use crate::client_error::ClientError;
use crate::config::toml::assert_no_inline_toml_entry::assert_no_inline_toml_entry;
use crate::config::toml::find_toml_table::find_toml_table;
use crate::config::toml::format_toml_table::format_toml_table;
use crate::config::toml::to_toml_table_key::to_toml_table_key;
use serde_json::{Map, Value};
use std::path::Path;
use usemcpkit_core::js::{js_trim, js_trim_end};

/// Replaces the `[servers.name]` key/value lines in place (keeping its subtables and comments elsewhere) or appends it.
pub fn upsert_toml_table(
    text: &str,
    servers_path: &[&str],
    name: &str,
    entry: &Map<String, Value>,
    path: &Path,
) -> Result<String, ClientError> {
    let table_key = to_toml_table_key(servers_path, name);
    let lines: Vec<&str> = text.split('\n').collect();
    let table = format_toml_table(&table_key, entry).map_err(ClientError)?;
    if let Some(range) = find_toml_table(&lines, &table_key, false) {
        let ends_blank = js_trim(lines[range.end - 1]).is_empty();
        let trailing_blank: &[&str] = if ends_blank { &[""] } else { &[] };
        let table_lines: Vec<&str> = table.iter().map(String::as_str).collect();
        let updated = [&lines[..range.start], &table_lines, trailing_blank, &lines[range.end..]].concat();
        return Ok(updated.join("\n"));
    }
    assert_no_inline_toml_entry(text, servers_path, name, path)?;
    let body = js_trim_end(text);
    let separator = if body.is_empty() { "" } else { "\n\n" };
    Ok(format!("{body}{separator}{}\n", table.join("\n")))
}
