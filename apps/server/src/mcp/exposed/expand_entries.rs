use crate::mcp::exposed::exposed_entry::ExposedEntry;
use std::collections::HashMap;
use std::rc::Rc;

/// Appends `entries` to `listed`, each opened section followed by what it holds.
pub fn expand_entries(
    entries: &[Rc<ExposedEntry>],
    children: &HashMap<String, Vec<Rc<ExposedEntry>>>,
    listed: &mut Vec<Rc<ExposedEntry>>,
) {
    for entry in entries {
        listed.push(Rc::clone(entry));
        if let ExposedEntry::Section(section) = &**entry
            && let Some(opened) = children.get(&section.key())
        {
            expand_entries(opened, children, listed);
        }
    }
}
