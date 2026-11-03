use crate::config::jsonc::node_kind::NodeKind;

/// jsonc-parser's `Node`, with its parent and children as indices into the tree's nodes. A property's children are its
/// key (a string node) and, once read, its value.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct JsonNode {
    pub kind: NodeKind,
    pub offset: usize,
    pub length: usize,
    pub parent: Option<usize>,
    pub children: Vec<usize>,
    /// The unescaped text of a string node.
    pub value: Option<String>,
}
