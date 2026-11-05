use crate::config::jsonc::find_node_at_location::find_node_at_location;
use crate::config::jsonc::insertion_edit::insertion_edit;
use crate::config::jsonc::node_kind::NodeKind;
use crate::config::jsonc::parse_tree::parse_tree;
use crate::config::jsonc::removal_edit::removal_edit;
use crate::config::jsonc::text_edit::TextEdit;
use crate::config::jsonc::with_formatting::with_formatting;
use serde_json::{Map, Value};
use usemcpkit_core::js::to_js_json;

/// jsonc-parser's `modify(text, path, value, { formattingOptions })` applied to `text`, for a path of property names:
/// sets the property at `path` to `value` (creating the objects on the way) or removes it when `value` is `None`.
/// The errors read as jsonc-parser's, its inverted "Can not add index" wording included.
pub fn set_property(text: &str, path: &[&str], value: Option<Value>, indent_size: usize) -> Result<String, String> {
    let tree = parse_tree(text, false);
    let mut remaining = path.to_vec();
    let mut value = value;
    let mut parent = None;
    let mut last_segment = None;
    while let Some(segment) = remaining.pop() {
        last_segment = Some(segment);
        parent = find_node_at_location(&tree, tree.root, &remaining);
        if parent.is_none()
            && let Some(inner) = value.take()
        {
            value = Some(Value::Object(Map::from_iter([(segment.to_owned(), inner)])));
            continue;
        }
        break;
    }
    let Some(parent) = parent else {
        let Some(value) = value else {
            return Err("Can not delete in empty document".to_owned());
        };
        let (offset, length) = tree
            .root
            .map(|root| (tree.node(root).offset, tree.node(root).length))
            .unwrap_or((0, 0));
        let edit = TextEdit {
            offset,
            length,
            content: to_js_json(&value),
        };
        return Ok(with_formatting(text, &edit, indent_size));
    };
    let kind = tree.node(parent).kind;
    let Some(segment) = last_segment.filter(|_| kind == NodeKind::Object) else {
        return Err(format!("Can not add index to parent of type {}", kind.name()));
    };
    let existing = find_node_at_location(&tree, Some(parent), &[segment]);
    let edit = match (existing, value) {
        (None, None) => return Ok(text.to_owned()),
        (None, Some(value)) => insertion_edit(&tree, parent, segment, &value),
        (Some(existing), None) => removal_edit(&tree, parent, existing)?,
        (Some(existing), Some(value)) => TextEdit {
            offset: tree.node(existing).offset,
            length: tree.node(existing).length,
            content: to_js_json(&value),
        },
    };
    Ok(with_formatting(text, &edit, indent_size))
}
