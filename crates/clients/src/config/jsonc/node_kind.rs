/// jsonc-parser's `NodeType`.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum NodeKind {
    Object,
    Array,
    Property,
    String,
    Number,
    Boolean,
    Null,
}

impl NodeKind {
    pub fn name(self) -> &'static str {
        match self {
            NodeKind::Object => "object",
            NodeKind::Array => "array",
            NodeKind::Property => "property",
            NodeKind::String => "string",
            NodeKind::Number => "number",
            NodeKind::Boolean => "boolean",
            NodeKind::Null => "null",
        }
    }
}
