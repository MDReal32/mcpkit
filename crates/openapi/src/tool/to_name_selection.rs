use indexmap::IndexMap;
use usemcpkit_manifest::tool::NameSelection;

/// A list when every argument keeps the outgoing name, a mapping otherwise.
pub fn to_name_selection(mapping: IndexMap<String, String>) -> NameSelection {
    if mapping.iter().all(|(key, argument)| key == argument) {
        NameSelection::List(mapping.into_keys().collect())
    } else {
        NameSelection::Mapping(mapping)
    }
}
