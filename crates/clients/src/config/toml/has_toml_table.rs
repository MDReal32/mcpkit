use crate::config::toml::find_toml_table::find_toml_table;
use crate::config::toml::to_toml_table_key::to_toml_table_key;

pub fn has_toml_table(text: &str, servers_path: &[&str], name: &str) -> bool {
    let lines: Vec<&str> = text.split('\n').collect();
    find_toml_table(&lines, &to_toml_table_key(servers_path, name), false).is_some()
}
