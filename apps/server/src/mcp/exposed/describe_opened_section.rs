use crate::mcp::exposed::exposed_entry::ExposedEntry;
use std::rc::Rc;

/// The reply to calling a section: what is inside it and what to do next, written for the model.
pub fn describe_opened_section(id: &str, children: &[Rc<ExposedEntry>]) -> String {
    let sections: Vec<&str> = children
        .iter()
        .filter(|child| matches!(***child, ExposedEntry::Section(_)))
        .map(|child| child.name())
        .collect();
    if !sections.is_empty() {
        let mut lines = vec![
            format!(
                "{id} is a section, not a tool. It has {} groups, each one another section.",
                sections.len()
            ),
            "Call a group (no arguments) to load its tools into the tool list:".to_owned(),
        ];
        lines.extend(sections.iter().map(|name| format!("- {name}")));
        return lines.join("\n");
    }
    if children.is_empty() {
        return format!("{id} has no tools.");
    }
    let mut lines = vec![format!(
        "{id}: {} tools are now in the tool list. Call them by these names:",
        children.len()
    )];
    lines.extend(children.iter().map(|child| format!("- {}", child.name())));
    lines.join("\n")
}
