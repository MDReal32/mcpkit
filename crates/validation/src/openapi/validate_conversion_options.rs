use crate::guards::is_string_list;
use crate::openapi::consts::{OPTION_FLAG_KEYS, OPTION_PATTERN_KEYS, OPTION_TEXT_KEYS};
use crate::openapi::validate_pattern::validate_pattern;
use crate::tool::validate_fixed_values;
use serde_json::Value;

pub fn validate_conversion_options(options: &Value, location: &str) -> Vec<String> {
    let Some(options) = options.as_object() else {
        return vec![format!("{location} must be an object")];
    };
    let mut errors = Vec::new();
    if options
        .get("maxDepth")
        .is_some_and(|depth| !depth.as_u64().is_some_and(|depth| depth >= 1))
    {
        errors.push(format!("{location}.maxDepth must be a positive integer"));
    }
    for key in OPTION_TEXT_KEYS {
        if options.get(*key).is_some_and(|value| !value.is_string()) {
            errors.push(format!("{location}.{key} must be a string"));
        }
    }
    for key in OPTION_FLAG_KEYS {
        if options.get(*key).is_some_and(|value| !value.is_boolean()) {
            errors.push(format!("{location}.{key} must be a boolean"));
        }
    }
    for key in OPTION_PATTERN_KEYS {
        let Some(patterns) = options.get(*key) else {
            continue;
        };
        if !is_string_list(Some(patterns)) {
            errors.push(format!("{location}.{key} must be a list of regular expressions"));
            continue;
        }
        for (index, pattern) in patterns.as_array().into_iter().flatten().enumerate() {
            errors.extend(validate_pattern(
                pattern.as_str(),
                &format!("{location}.{key}[{index}]"),
                false,
            ));
        }
    }
    if options
        .get("security")
        .is_some_and(|security| !is_string_list(Some(security)))
    {
        errors.push(format!("{location}.security must be a list of strings"));
    }
    errors.extend(validate_fixed_values(
        options.get("fixedQuery"),
        &format!("{location}.fixedQuery"),
    ));
    errors
}
