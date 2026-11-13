use crate::find_duplicates::find_duplicates;
use crate::openapi::validate_open_api_source::validate_open_api_source;
use crate::openapi::validate_openapi_naming::validate_openapi_naming;
use serde_json::{Map, Value};
use usemcpkit_core::js::to_js_string;

/// The manifest's `openapi`: its sources, in order, and the rules that name the tools built from them.
pub fn validate_openapi_spec(manifest: &Map<String, Value>) -> Vec<String> {
    let Some(openapi) = manifest.get("openapi") else {
        return Vec::new();
    };
    let Some(openapi) = openapi.as_object() else {
        return vec!["openapi must be an object".to_owned()];
    };
    let Some(sources) = openapi
        .get("sources")
        .and_then(Value::as_array)
        .filter(|sources| !sources.is_empty())
    else {
        return vec!["openapi.sources must be a non-empty array".to_owned()];
    };
    let mut errors: Vec<String> = sources
        .iter()
        .enumerate()
        .flat_map(|(index, source)| validate_open_api_source(source, &format!("openapi.sources[{index}]")))
        .collect();
    let names: Vec<Option<&Value>> = sources.iter().map(|source| source.get("name")).collect();
    let duplicates = find_duplicates(&names);
    if !duplicates.is_empty() {
        let listed: Vec<String> = duplicates.into_iter().map(to_js_string).collect();
        errors.push(format!("duplicate OpenAPI source names: {}", listed.join(", ")));
    }
    if let Some(naming) = openapi.get("naming") {
        errors.extend(validate_openapi_naming(naming));
    }
    errors
}
