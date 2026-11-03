use crate::args::{ArgValue, ToolArgs};
use crate::request::collect_args::collect_args;
use indexmap::IndexMap;
use mcpkit_core::js::{to_js_json, to_js_string};
use mcpkit_http::{FormPart, FormValue};
use mcpkit_manifest::tool::RequestSpec;
use serde_json::Value;

/// One part per file of a file argument, else one text part: objects, arrays and `null` as JSON, the rest as text.
pub fn build_form_data(spec: &RequestSpec, args: &ToolArgs) -> Vec<FormPart> {
    let mut values: IndexMap<String, ArgValue> = spec
        .fixed_body
        .iter()
        .flatten()
        .map(|(key, value)| (key.clone(), ArgValue::Json(value.to_value())))
        .collect();
    values.extend(collect_args(spec.body.as_ref(), args));
    let mut parts = Vec::new();
    for (name, value) in values {
        let files = value.uploaded_files();
        if !files.is_empty() {
            parts.extend(files.into_iter().map(|file| FormPart {
                name: name.clone(),
                value: FormValue::File {
                    file_name: file.name.clone(),
                    data: file.data.clone(),
                },
            }));
            continue;
        }
        let json = value.to_json();
        let text = match &json {
            Value::Object(_) | Value::Array(_) | Value::Null => to_js_json(&json),
            other => to_js_string(Some(other)),
        };
        parts.push(FormPart {
            name,
            value: FormValue::Text(text),
        });
    }
    parts
}
