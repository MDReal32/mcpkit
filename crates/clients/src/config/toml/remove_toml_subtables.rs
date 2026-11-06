use crate::config::toml::find_toml_table::find_toml_table;
use serde_json::{Map, Value};

/// Drops the `[table_key.key]` table, with its own subtables, of each object value in the entry, since the entry
/// writes them again; the other subtables stay.
pub fn remove_toml_subtables<'a>(lines: Vec<&'a str>, table_key: &str, entry: &Map<String, Value>) -> Vec<&'a str> {
    entry
        .iter()
        .filter(|(_, value)| value.is_object())
        .fold(lines, |lines, (key, _)| {
            match find_toml_table(&lines, &format!("{table_key}.{key}"), true) {
                Some(range) => [&lines[..range.start], &lines[range.end..]].concat(),
                None => lines,
            }
        })
}
