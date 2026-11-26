use regex::Regex;
use serde_json::{Map, Value};
use usemcpkit_manifest::domain::is_domain_value;

pub fn validate_domain_discovery(domain: &Map<String, Value>) -> Vec<String> {
    let Some(discover) = domain.get("discover") else {
        return Vec::new();
    };
    let Some(discover) = discover.as_object() else {
        return vec!["domain.discover must be an object".to_owned()];
    };
    let mut errors = Vec::new();
    let host_is_valid = discover
        .get("host")
        .and_then(Value::as_str)
        .is_some_and(|host| is_domain_value(host) && !host.contains([':', '/']));
    if !host_is_valid {
        errors.push("domain.discover.host must be a host name or address".to_owned());
    }
    match discover.get("ports").and_then(Value::as_array) {
        Some(ports) if !ports.is_empty() => {
            for (index, source) in ports.iter().enumerate() {
                errors.extend(validate_port_source(source, &format!("domain.discover.ports[{index}]")));
            }
        }
        _ => errors.push("domain.discover.ports must be a non-empty array".to_owned()),
    }
    errors
}

fn validate_port_source(source: &Value, location: &str) -> Vec<String> {
    let Some(source) = source.as_object() else {
        return vec![format!("{location} must be an object")];
    };
    match source.get("type").and_then(Value::as_str) {
        Some("env") => validate_env_port_source(source, location),
        Some("log") => validate_log_port_source(source, location),
        _ => vec![format!("{location}.type must be \"env\" or \"log\"")],
    }
}

fn validate_env_port_source(source: &Map<String, Value>, location: &str) -> Vec<String> {
    let has_name = source
        .get("name")
        .and_then(Value::as_str)
        .is_some_and(|name| !name.is_empty());
    if has_name {
        Vec::new()
    } else {
        vec![format!("{location}.name must be a non-empty string")]
    }
}

fn validate_log_port_source(source: &Map<String, Value>, location: &str) -> Vec<String> {
    let mut errors = Vec::new();
    let files_are_valid = source.get("files").and_then(Value::as_array).is_some_and(|files| {
        !files.is_empty()
            && files
                .iter()
                .all(|file| file.as_str().is_some_and(|file| !file.is_empty()))
    });
    if !files_are_valid {
        errors.push(format!("{location}.files must be a non-empty list of glob patterns"));
    }
    let pattern_is_valid = source
        .get("pattern")
        .and_then(Value::as_str)
        .and_then(|pattern| Regex::new(pattern).ok())
        .is_some_and(|pattern| pattern.captures_len() > 1);
    if !pattern_is_valid {
        errors.push(format!(
            "{location}.pattern must be a regular expression with a capture group"
        ));
    }
    errors
}
