use crate::credentials::CredentialRequest;
use crate::json::is_string_record;
use serde_json::{Map, Value};
use usemcpkit_manifest::ui::fill_template;

/// The chosen option must be one that was offered, with every field filled; `values` that are not all strings count as
/// none given.
pub fn validate_token_response(request: &CredentialRequest, response: &Map<String, Value>) -> Vec<String> {
    let chosen = response.get("option").and_then(Value::as_f64);
    let Some(option) = request
        .options
        .iter()
        .find(|candidate| chosen == Some(candidate.index as f64))
    else {
        return vec!["choose one of the offered credentials".to_owned()];
    };
    let values = response
        .get("values")
        .filter(|values| is_string_record(values))
        .and_then(Value::as_object);
    option
        .fields
        .iter()
        .filter(|field| {
            values
                .and_then(|values| values.get(&field.key))
                .and_then(Value::as_str)
                .is_none_or(|value| value.trim().is_empty())
        })
        .map(|field| fill_template(request.text("requiredField"), &[("label", &field.label)]))
        .collect()
}
