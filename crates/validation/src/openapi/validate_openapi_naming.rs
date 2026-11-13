use crate::guards::is_name_template;
use crate::openapi::validate_pattern::validate_pattern;
use serde_json::Value;

/// The `"regex": "template"` rules that name the built tools.
pub fn validate_openapi_naming(naming: &Value) -> Vec<String> {
    let Some(rules) = naming.as_object() else {
        return vec!["openapi.naming must map regular expressions to name templates".to_owned()];
    };
    rules
        .iter()
        .flat_map(|(pattern, template)| {
            let location = format!("openapi.naming[\"{pattern}\"]");
            let mut errors: Vec<String> = validate_pattern(Some(pattern), &location, false).into_iter().collect();
            if !template.as_str().is_some_and(is_name_template) {
                errors.push(format!(
                    "{location} must name <group>:<resource>:<action> with $1… for the captures"
                ));
            }
            errors
        })
        .collect()
}
