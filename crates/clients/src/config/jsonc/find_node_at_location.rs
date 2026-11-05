use crate::config::jsonc::json_tree::JsonTree;
use crate::config::jsonc::node_kind::NodeKind;

/// jsonc-parser's `findNodeAtLocation` for a path of property names: the first property of a name wins.
pub fn find_node_at_location(tree: &JsonTree, start: Option<usize>, path: &[&str]) -> Option<usize> {
    let mut node = start?;
    for segment in path {
        if tree.node(node).kind != NodeKind::Object {
            return None;
        }
        node = tree
            .node(node)
            .children
            .iter()
            .filter(|property| tree.property_key(**property) == Some(segment))
            .find_map(|property| tree.property_value(*property))?;
    }
    Some(node)
}
