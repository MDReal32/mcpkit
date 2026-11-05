use serde_json::Value;
use usemcpkit_manifest::domain::is_domain_value;

/// An array of `host[:port][/path]` strings.
pub fn is_domain_value_list(value: &Value) -> bool {
    value
        .as_array()
        .is_some_and(|items| items.iter().all(|item| item.as_str().is_some_and(is_domain_value)))
}
