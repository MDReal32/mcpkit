use serde_json::{Map, Value};

/// The arguments with each schema `default` filled in where the client sent nothing.
pub fn apply_input_defaults(input: &Map<String, Value>, raw: Option<&Map<String, Value>>) -> Map<String, Value> {
    let mut args: Map<String, Value> = input
        .get("properties")
        .and_then(Value::as_object)
        .into_iter()
        .flatten()
        .filter_map(|(name, schema)| Some((name.clone(), schema.as_object()?.get("default")?.clone())))
        .collect();
    for (name, value) in raw.into_iter().flatten() {
        args.insert(name.clone(), value.clone());
    }
    args
}
