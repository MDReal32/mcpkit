use serde_json::{Map, Value, json};
use std::path::Path;
use usemcpkit_clients::config::{
    format_toml_value, has_json_entry, has_toml_table, parse_json_config, remove_json_entry, remove_toml_table,
    upsert_json_entry, upsert_toml_table,
};

const GOLDEN: &str = include_str!("fixtures/config-edits.json");

/// The outcome as the golden file writes it: `{ "value": … }` or `{ "error": message }`.
fn outcome<T: Into<Value>, E: std::fmt::Display>(result: Result<T, E>) -> Value {
    match result {
        Ok(value) => json!({ "value": value.into() }),
        Err(error) => json!({ "error": error.to_string() }),
    }
}

fn golden() -> Value {
    serde_json::from_str(GOLDEN).unwrap()
}

fn servers_path(row: &Value) -> Vec<&str> {
    row["serversPath"]
        .as_array()
        .unwrap()
        .iter()
        .map(|segment| segment.as_str().unwrap())
        .collect()
}

#[test]
fn json_edits_match_jsonc_parser() {
    let golden = golden();
    let path = Path::new("config.json");
    for row in golden["json"].as_array().unwrap() {
        let name = row["name"].as_str().unwrap();
        let text = row["text"].as_str().unwrap();
        let servers = servers_path(row);
        let parsed = parse_json_config(text, path).map(|tree| has_json_entry(&tree, &servers, "usemcpkit"));
        assert_eq!(outcome(parsed.clone()), row["parse"], "{name}: parse");
        if parsed.is_err() {
            continue;
        }
        let upsert = upsert_json_entry(text, &servers, "usemcpkit", &golden["entry"]);
        assert_eq!(outcome(upsert), row["upsert"], "{name}: upsert");
        let upsert_other = upsert_json_entry(text, &servers, "usemcpkit", &golden["otherEntry"]);
        assert_eq!(outcome(upsert_other), row["upsertOther"], "{name}: upsert other");
        let remove = remove_json_entry(text, &servers, "usemcpkit");
        assert_eq!(outcome(remove), row["remove"], "{name}: remove");
    }
}

#[test]
fn toml_edits_match_the_typescript_cli() {
    let golden = golden();
    let path = Path::new("config.toml");
    let servers = ["mcp_servers"];
    let entry: &Map<String, Value> = golden["tomlEntry"].as_object().unwrap();
    for row in golden["toml"].as_array().unwrap() {
        let name = row["name"].as_str().unwrap();
        let text = row["text"].as_str().unwrap();
        assert_eq!(
            Value::from(has_toml_table(text, &servers, "usemcpkit")),
            row["has"],
            "{name}: has"
        );
        let upsert = upsert_toml_table(text, &servers, "usemcpkit", entry, path);
        assert_eq!(outcome(upsert), row["upsert"], "{name}: upsert");
        assert_eq!(
            Value::from(remove_toml_table(text, &servers, "usemcpkit")),
            row["remove"],
            "{name}: remove"
        );
    }
}

#[test]
fn toml_values_match_the_typescript_cli() {
    let golden = golden();
    for row in golden["tomlValues"].as_array().unwrap() {
        assert_eq!(
            outcome(format_toml_value(&row["value"])),
            row["formatted"],
            "{}",
            row["value"]
        );
    }
}
