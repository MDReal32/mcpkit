pub fn to_toml_table_key(servers_path: &[&str], name: &str) -> String {
    servers_path.iter().copied().chain([name]).collect::<Vec<_>>().join(".")
}
