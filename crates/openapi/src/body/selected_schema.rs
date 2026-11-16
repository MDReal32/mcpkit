use serde_json::Value;

/// A body schema: a node of the document, or one made up for a body that declares none.
pub enum SelectedSchema<'a> {
    SpecDocument(&'a Value),
    Owned(Value),
}

impl<'a> SelectedSchema<'a> {
    pub fn node(&self) -> &Value {
        match self {
            SelectedSchema::SpecDocument(node) => node,
            SelectedSchema::Owned(node) => node,
        }
    }
}
