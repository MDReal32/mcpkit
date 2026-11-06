use crate::config::toml::format_toml_value::format_toml_value;
use serde_json::{Map, Value};

/// Writes `[table_key]` with the entry's values, each object value as a `[table_key.key]` subtable after them.
pub fn format_toml_table(table_key: &str, entry: &Map<String, Value>) -> Result<Vec<String>, String> {
    let mut lines = vec![format!("[{table_key}]")];
    let mut subtables = Vec::new();
    for (key, value) in entry {
        if let Value::Object(table) = value {
            subtables.push(String::new());
            subtables.extend(format_toml_table(&format!("{table_key}.{key}"), table)?);
            continue;
        }
        lines.push(format!("{key} = {}", format_toml_value(value)?));
    }
    lines.extend(subtables);
    Ok(lines)
}
