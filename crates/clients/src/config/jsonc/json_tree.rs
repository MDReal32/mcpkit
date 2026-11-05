use crate::config::jsonc::json_node::JsonNode;
use crate::config::jsonc::parse_error::ParseError;

/// What jsonc-parser's `parseTree` returns, with the errors it collected.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct JsonTree {
    pub nodes: Vec<JsonNode>,
    pub root: Option<usize>,
    pub errors: Vec<ParseError>,
}

impl JsonTree {
    pub fn node(&self, index: usize) -> &JsonNode {
        &self.nodes[index]
    }

    /// The key of a property node.
    pub fn property_key(&self, property: usize) -> Option<&str> {
        let key = *self.node(property).children.first()?;
        self.node(key).value.as_deref()
    }

    /// The value of a property node, when it has one.
    pub fn property_value(&self, property: usize) -> Option<usize> {
        match self.node(property).children.as_slice() {
            [_, value] => Some(*value),
            _ => None,
        }
    }
}
