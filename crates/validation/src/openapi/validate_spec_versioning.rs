use crate::guards::is_string_record;
use crate::openapi::validate_pattern::validate_pattern;
use serde_json::Value;

/// A source's `version`: the probe that asks the server, and where the published versions are found.
pub fn validate_spec_versioning(version: &Value, location: &str) -> Vec<String> {
    let Some(version) = version.as_object() else {
        return vec![format!("{location} must be an object")];
    };
    let mut errors = Vec::new();
    match version.get("probe").and_then(Value::as_object) {
        None => errors.push(format!("{location}.probe must be an object")),
        Some(probe) => {
            if !probe
                .get("path")
                .and_then(Value::as_str)
                .is_some_and(|path| path.starts_with('/'))
            {
                errors.push(format!("{location}.probe.path must start with /"));
            }
            if !probe
                .get("field")
                .and_then(Value::as_str)
                .is_some_and(|field| !field.is_empty())
            {
                errors.push(format!("{location}.probe.field must be a dotted path"));
            }
            let pattern = probe.get("match").and_then(Value::as_str);
            errors.extend(validate_pattern(pattern, &format!("{location}.probe.match"), true));
        }
    }
    if version.get("env").is_some_and(|env| !env.is_string()) {
        errors.push(format!("{location}.env must be a string"));
    }
    if let Some(list) = version.get("list") {
        match list.as_object() {
            None => errors.push(format!("{location}.list must be an object")),
            Some(list) => {
                if !list
                    .get("url")
                    .and_then(Value::as_str)
                    .is_some_and(|url| !url.is_empty())
                {
                    errors.push(format!("{location}.list.url must be a URL"));
                }
                for key in ["items", "field"] {
                    if list.get(key).is_some_and(|value| !value.is_string()) {
                        errors.push(format!("{location}.list.{key} must be a string"));
                    }
                }
                let pattern = list.get("match").and_then(Value::as_str);
                errors.extend(validate_pattern(pattern, &format!("{location}.list.match"), true));
            }
        }
    }
    if version.get("known").is_some_and(|known| !is_string_record(Some(known))) {
        errors.push(format!("{location}.known must map versions to strings"));
    }
    errors
}
