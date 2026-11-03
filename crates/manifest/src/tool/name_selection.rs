use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

/// Which names a request part or a response keeps: a list passes them under their own names, a mapping is
/// `{ outgoing: source }` (args by outgoing key, response fields by output name with `items[].name` paths).
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(untagged)]
pub enum NameSelection {
    List(Vec<String>),
    Mapping(IndexMap<String, String>),
}

impl NameSelection {
    /// `{ outgoing: source }`, a list mapping each name to itself.
    pub fn to_mapping(&self) -> IndexMap<String, String> {
        match self {
            NameSelection::List(names) => names.iter().map(|name| (name.clone(), name.clone())).collect(),
            NameSelection::Mapping(mapping) => mapping.clone(),
        }
    }
}
