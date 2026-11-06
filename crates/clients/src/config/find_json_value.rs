use crate::config::jsonc::{JsonTree, NodeKind};

/// The node at `path` in the parsed config. Like the object `JSON.parse` would build, the last of two properties with
/// one name wins.
pub fn find_json_value(tree: &JsonTree, path: &[&str]) -> Option<usize> {
    let mut node = tree.root;
    for segment in path {
        node = node.and_then(|object| {
            let object = tree.node(object);
            if object.kind != NodeKind::Object {
                return None;
            }
            object
                .children
                .iter()
                .rev()
                .filter(|property| tree.property_key(**property) == Some(segment))
                .find_map(|property| tree.property_value(*property))
        });
    }
    node
}
