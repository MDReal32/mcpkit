use serde_json::Value;
use usemcpkit_manifest::ui::DEFAULT_UI_TEXTS;

pub fn validate_ui_texts(texts: Option<&Value>, location: &str) -> Vec<String> {
    let Some(texts) = texts else {
        return Vec::new();
    };
    let Some(texts) = texts.as_object() else {
        return vec![format!("{location} must be an object of strings")];
    };
    let known_keys: Vec<&str> = DEFAULT_UI_TEXTS.iter().map(|(key, _)| *key).collect();
    texts
        .iter()
        .filter_map(|(key, value)| {
            if !known_keys.contains(&key.as_str()) {
                return Some(format!(
                    "{location}.{key} is not a text of the page, use one of: {}",
                    known_keys.join(", ")
                ));
            }
            (!value.is_string()).then(|| format!("{location}.{key} must be a string"))
        })
        .collect()
}
