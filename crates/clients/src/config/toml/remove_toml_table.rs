use crate::config::toml::find_toml_table::find_toml_table;
use crate::config::toml::to_toml_table_key::to_toml_table_key;

/// Removes `[servers.name]` with its subtables; a file without it comes back as it was.
pub fn remove_toml_table(text: &str, servers_path: &[&str], name: &str) -> String {
    let lines: Vec<&str> = text.split('\n').collect();
    let Some(range) = find_toml_table(&lines, &to_toml_table_key(servers_path, name), true) else {
        return text.to_owned();
    };
    [&lines[..range.start], &lines[range.end..]].concat().join("\n")
}
