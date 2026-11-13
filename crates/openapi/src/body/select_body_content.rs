use crate::body::selected_body::SelectedBody;
use crate::body::selected_schema::SelectedSchema;
use crate::consts::{BINARY_CONTENT_TYPE, JSON_CONTENT_TYPE, MULTIPART_CONTENT_TYPE};
use serde_json::{Map, Value, json};

/// The body to send, in this order: JSON, another `+json` type, text, multipart, raw bytes. Nothing else (a form, for
/// example) can be sent.
pub fn select_body_content(content: &Map<String, Value>) -> Option<SelectedBody<'_>> {
    let with_schema = |content_type: &str| content.get(content_type).and_then(|entry| entry.get("schema"));
    if let Some(schema) = with_schema(JSON_CONTENT_TYPE) {
        return Some(SelectedBody {
            content_type: JSON_CONTENT_TYPE.to_owned(),
            schema: SelectedSchema::SpecDocument(schema),
        });
    }
    let json_like = content
        .iter()
        .find(|(content_type, entry)| content_type.ends_with("+json") && entry.get("schema").is_some());
    if let Some((content_type, entry)) = json_like {
        return Some(SelectedBody {
            content_type: content_type.clone(),
            schema: SelectedSchema::SpecDocument(&entry["schema"]),
        });
    }
    if let Some((content_type, entry)) = content
        .iter()
        .find(|(content_type, _)| content_type.starts_with("text/"))
    {
        let schema = match entry.get("schema") {
            Some(schema) => SelectedSchema::SpecDocument(schema),
            None => SelectedSchema::Owned(json!({ "type": "string" })),
        };
        return Some(SelectedBody {
            content_type: content_type.clone(),
            schema,
        });
    }
    if let Some(schema) = with_schema(MULTIPART_CONTENT_TYPE) {
        return Some(SelectedBody {
            content_type: MULTIPART_CONTENT_TYPE.to_owned(),
            schema: SelectedSchema::SpecDocument(schema),
        });
    }
    [BINARY_CONTENT_TYPE, "*/*"]
        .iter()
        .any(|content_type| content.contains_key(*content_type))
        .then(|| SelectedBody {
            content_type: BINARY_CONTENT_TYPE.to_owned(),
            schema: SelectedSchema::Owned(json!({ "type": "string", "format": "binary" })),
        })
}
