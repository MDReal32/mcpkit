use crate::config::find_json_value::find_json_value;
use crate::config::jsonc::{JsonTree, NodeKind};

/// Whether the parsed config has `name` in the object at `servers_path`.
pub fn has_json_entry(tree: &JsonTree, servers_path: &[&str], name: &str) -> bool {
    find_json_value(tree, servers_path).is_some_and(|servers| {
        let servers = tree.node(servers);
        servers.kind == NodeKind::Object
            && servers
                .children
                .iter()
                .any(|property| tree.property_key(*property) == Some(name))
    })
}
