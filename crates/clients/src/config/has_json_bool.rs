use crate::config::find_json_value::find_json_value;
use crate::config::jsonc::{JsonTree, NodeKind};

/// Whether the property at `path` of the config parsed from `text` is the literal `value`.
pub fn has_json_bool(tree: &JsonTree, text: &str, path: &[&str], value: bool) -> bool {
    find_json_value(tree, path).is_some_and(|node| {
        let node = tree.node(node);
        node.kind == NodeKind::Boolean
            && text.get(node.offset..node.offset + node.length) == Some(if value { "true" } else { "false" })
    })
}
