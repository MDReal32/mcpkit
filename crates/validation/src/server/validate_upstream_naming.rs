use crate::server::validate_naming_rule::validate_naming_rule;
use serde_json::Value;

pub fn validate_upstream_naming(naming: &Value) -> Vec<String> {
    let Some(rules) = naming.as_array() else {
        return vec!["upstream.naming must be a list of rules".to_owned()];
    };
    rules
        .iter()
        .enumerate()
        .flat_map(|(position, rule)| validate_naming_rule(rule, position))
        .collect()
}
