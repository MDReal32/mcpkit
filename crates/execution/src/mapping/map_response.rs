use crate::mapping::get_path::get_path;
use crate::mapping::pick_fields::pick_fields;
use serde_json::Value;
use usemcpkit_manifest::tool::ResponseSpec;

/// `None` stands for `undefined`, a root path that found nothing.
pub fn map_response(data: Option<Value>, response: Option<&ResponseSpec>) -> Option<Value> {
    let root = match response.and_then(|response| response.root.as_deref()) {
        Some(root) if !root.is_empty() => get_path(data.as_ref(), root),
        _ => data,
    };
    let Some(fields) = response.and_then(|response| response.fields.as_ref()) else {
        return root;
    };
    let field_mapping = fields.to_mapping();
    match root {
        Some(Value::Array(items)) => Some(Value::Array(
            items
                .iter()
                .map(|item| pick_fields(Some(item), &field_mapping))
                .collect(),
        )),
        root => Some(pick_fields(root.as_ref(), &field_mapping)),
    }
}

#[cfg(test)]
mod tests {
    use super::map_response;
    use serde_json::{Value, json};
    use usemcpkit_manifest::tool::ResponseSpec;

    fn spec(value: Value) -> ResponseSpec {
        serde_json::from_value(value).unwrap()
    }

    #[test]
    fn returns_the_data_unchanged_without_a_spec() {
        assert_eq!(map_response(Some(json!({ "a": 1 })), None), Some(json!({ "a": 1 })));
    }

    #[test]
    fn picks_renamed_fields_from_each_item_under_the_root() {
        let response = spec(json!({ "root": "values", "fields": { "id": "id", "title": "fields.summary" } }));
        let data = json!({ "values": [{ "id": 1, "fields": { "summary": "a" } }, { "id": 2 }] });

        assert_eq!(
            map_response(Some(data), Some(&response)),
            Some(json!([{ "id": 1, "title": "a" }, { "id": 2, "title": null }]))
        );
    }

    #[test]
    fn picks_fields_listed_by_name_from_an_object() {
        let response = spec(json!({ "fields": ["id", "name"] }));

        assert_eq!(
            map_response(Some(json!({ "id": 1, "name": "x", "other": true })), Some(&response)),
            Some(json!({ "id": 1, "name": "x" }))
        );
    }

    #[test]
    fn gives_undefined_for_a_missing_root() {
        let response = spec(json!({ "root": "data.items" }));

        assert_eq!(map_response(Some(json!({ "data": {} })), Some(&response)), None);
    }
}
