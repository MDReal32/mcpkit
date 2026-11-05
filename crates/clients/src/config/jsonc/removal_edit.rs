use crate::config::jsonc::json_tree::JsonTree;
use crate::config::jsonc::text_edit::TextEdit;

/// The edit that removes the property holding `existing` from the object `parent`, with the comma before it (or, for
/// the first property, the one after it).
pub fn removal_edit(tree: &JsonTree, parent: usize, existing: usize) -> Result<TextEdit, String> {
    let property = tree.node(existing).parent.ok_or("Malformed AST")?;
    let siblings = &tree.node(parent).children;
    let index = siblings
        .iter()
        .position(|sibling| *sibling == property)
        .ok_or("Malformed AST")?;
    let mut end = tree.node(property).offset + tree.node(property).length;
    let begin = match index {
        0 => {
            if let Some(next) = siblings.get(1) {
                end = tree.node(*next).offset;
            }
            tree.node(parent).offset + 1
        }
        _ => {
            let previous = tree.node(siblings[index - 1]);
            previous.offset + previous.length
        }
    };
    Ok(TextEdit {
        offset: begin,
        length: end - begin,
        content: String::new(),
    })
}
