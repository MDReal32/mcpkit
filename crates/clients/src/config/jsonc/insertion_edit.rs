use crate::config::jsonc::json_tree::JsonTree;
use crate::config::jsonc::text_edit::TextEdit;
use serde_json::Value;
use usemcpkit_core::js::to_js_json;

/// The edit that adds `segment: value` as the last property of the object `parent`.
pub fn insertion_edit(tree: &JsonTree, parent: usize, segment: &str, value: &Value) -> TextEdit {
    let property = format!(
        "{}: {}",
        to_js_json(&Value::String(segment.to_owned())),
        to_js_json(value)
    );
    match tree.node(parent).children.last() {
        Some(previous) => TextEdit {
            offset: tree.node(*previous).offset + tree.node(*previous).length,
            length: 0,
            content: format!(",{property}"),
        },
        None => TextEdit {
            offset: tree.node(parent).offset + 1,
            length: 0,
            content: property,
        },
    }
}
