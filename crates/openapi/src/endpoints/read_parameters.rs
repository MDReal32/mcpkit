use crate::OpenApiError;
use crate::document::SpecDocument;
use crate::endpoints::Parameter;
use serde_json::Value;

/// The parameters listed under `parameters` of a path item or operation, references followed.
pub fn read_parameters<'a>(document: &SpecDocument<'a>, owner: &'a Value) -> Result<Vec<Parameter<'a>>, OpenApiError> {
    let mut parameters = Vec::new();
    for entry in owner.get("parameters").and_then(Value::as_array).into_iter().flatten() {
        let resolved = document.resolve(entry)?;
        let (Some(name), Some(location)) = (
            resolved.get("name").and_then(Value::as_str),
            resolved.get("in").and_then(Value::as_str),
        ) else {
            continue;
        };
        parameters.push(Parameter {
            name: name.to_owned(),
            location: location.to_owned(),
            required: resolved.get("required").and_then(Value::as_bool) == Some(true) || location == "path",
            description: resolved.get("description").and_then(Value::as_str).map(str::to_owned),
            schema: resolved.get("schema"),
            explode: resolved.get("explode").and_then(Value::as_bool),
        });
    }
    Ok(parameters)
}
