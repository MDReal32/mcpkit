use crate::mapping::get_path::get_path;
use indexmap::IndexMap;
use serde_json::{Map, Value};

pub fn pick_fields(item: Option<&Value>, field_mapping: &IndexMap<String, String>) -> Value {
    Value::Object(
        field_mapping
            .iter()
            .map(|(output_name, path)| (output_name.clone(), get_path(item, path).unwrap_or(Value::Null)))
            .collect::<Map<String, Value>>(),
    )
}
