use crate::config::jsonc::{JsonTree, NodeKind};

/// Whether the parsed config has `name` in the object at `servers_path`. Like the object `JSON.parse` would build, the
/// last of two properties with one name wins on the way there.
pub fn has_json_entry(tree: &JsonTree, servers_path: &[&str], name: &str) -> bool {
    let mut node = tree.root;
    for segment in servers_path {
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
    node.is_some_and(|servers| {
        let servers = tree.node(servers);
        servers.kind == NodeKind::Object
            && servers
                .children
                .iter()
                .any(|property| tree.property_key(*property) == Some(name))
    })
}
