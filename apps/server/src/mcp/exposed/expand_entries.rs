use crate::mcp::exposed::exposed_entry::ExposedEntry;
use std::collections::HashMap;
use std::rc::Rc;

/// Appends `entries` to `listed`, each opened section followed by what it holds; with `hide_opened` an opened section
/// is left out and only what it holds is listed.
pub fn expand_entries(
    entries: &[Rc<ExposedEntry>],
    children: &HashMap<String, Vec<Rc<ExposedEntry>>>,
    hide_opened: bool,
    listed: &mut Vec<Rc<ExposedEntry>>,
) {
    for entry in entries {
        let opened = match &**entry {
            ExposedEntry::Section(section) => children.get(&section.key()),
            ExposedEntry::Tool(_) => None,
        };
        if opened.is_none() || !hide_opened {
            listed.push(Rc::clone(entry));
        }
        if let Some(opened) = opened {
            expand_entries(opened, children, hide_opened, listed);
        }
    }
}
