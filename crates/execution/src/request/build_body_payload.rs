use crate::args::{ArgValue, ToolArgs};
use crate::json::expand_json_paths;
use crate::request::collect_args::collect_args;
use indexmap::IndexMap;
use mcpkit_manifest::tool::RequestSpec;
use serde_json::Value;

/// The `bodyArg` argument as it is, otherwise the fixed and collected body values expanded into nested JSON; nothing
/// when there is no value to send.
pub fn build_body_payload(spec: &RequestSpec, args: &ToolArgs) -> Option<ArgValue> {
    if let Some(body_arg) = &spec.body_arg {
        return args.get(body_arg).cloned();
    }
    let mut values: IndexMap<String, Value> = spec
        .fixed_body
        .iter()
        .flatten()
        .map(|(key, value)| (key.clone(), value.to_value()))
        .collect();
    for (key, value) in collect_args(spec.body.as_ref(), args) {
        values.insert(key, value.to_json());
    }
    if values.is_empty() {
        return None;
    }
    Some(ArgValue::Json(expand_json_paths(values)))
}
