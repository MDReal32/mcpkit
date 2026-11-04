use crate::guards::is_string_list;
use crate::ui::format_placeholders::format_placeholders;
use serde_json::Value;
use usemcpkit_manifest::ui::{UI_DOMAIN_PLACEHOLDERS, read_placeholders};

pub fn validate_cli_args(args: Option<&Value>, location: &str, has_domain: bool) -> Vec<String> {
    let Some(args) = args.filter(|args| is_string_list(Some(args))).and_then(Value::as_array) else {
        return vec![format!("{location}.args must be an array of strings")];
    };
    let placeholders: Vec<&str> = args
        .iter()
        .filter_map(Value::as_str)
        .flat_map(read_placeholders)
        .collect();
    let unknown: Vec<&str> = placeholders
        .iter()
        .copied()
        .filter(|name| !UI_DOMAIN_PLACEHOLDERS.contains(name))
        .collect();
    if !unknown.is_empty() {
        return vec![format!(
            "{location}.args has unknown placeholders: {}",
            format_placeholders(&unknown)
        )];
    }
    if !has_domain && !placeholders.is_empty() {
        return vec![format!(
            "{location}.args uses the domain, so the manifest needs a domain"
        )];
    }
    Vec::new()
}
