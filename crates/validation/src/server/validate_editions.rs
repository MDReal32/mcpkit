use crate::guards::{is_category_name, is_string_list};
use crate::server::consts::EDITION_NAME_PATTERN;
use serde_json::Value;

pub fn validate_editions(editions: Option<&Value>) -> Vec<String> {
    let Some(editions) = editions else {
        return Vec::new();
    };
    let Some(editions) = editions.as_object() else {
        return vec!["editions must be an object".to_owned()];
    };
    editions
        .iter()
        .flat_map(|(name, edition)| {
            let location = format!("editions.{name}");
            if !is_category_name(name) {
                return vec![format!("{location}: name must match {EDITION_NAME_PATTERN}")];
            }
            let hosts = edition.as_object().and_then(|edition| edition.get("hosts"));
            if !is_string_list(hosts) || hosts.and_then(Value::as_array).is_some_and(Vec::is_empty) {
                return vec![format!("{location}.hosts must be a non-empty array of host suffixes")];
            }
            if edition.get("label").is_some_and(|label| !label.is_string()) {
                return vec![format!("{location}.label must be a string")];
            }
            Vec::new()
        })
        .collect()
}
