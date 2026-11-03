use crate::config::toml::format_toml_value::format_toml_value;
use serde_json::{Map, Value};

pub fn format_toml_table(table_key: &str, entry: &Map<String, Value>) -> Result<Vec<String>, String> {
    let mut lines = vec![format!("[{table_key}]")];
    for (key, value) in entry {
        lines.push(format!("{key} = {}", format_toml_value(value)?));
    }
    Ok(lines)
}
