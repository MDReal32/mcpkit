use crate::mcp::annotations::consts::{DESTRUCTIVE_VERBS, SAFE_VERBS, WRITE_VERBS};
use crate::mcp::annotations::tool_annotations::ToolAnnotations;

/// A verb in none of the lists gets no annotations, so the client files it under "Other tools".
pub fn create_tool_annotations(verb: &str) -> Option<ToolAnnotations> {
    if SAFE_VERBS.contains(&verb) {
        Some(ToolAnnotations::READ_ONLY)
    } else if DESTRUCTIVE_VERBS.contains(&verb) {
        Some(ToolAnnotations::DESTRUCTIVE)
    } else if WRITE_VERBS.contains(&verb) {
        Some(ToolAnnotations::WRITES)
    } else {
        None
    }
}

#[cfg(test)]
mod tests {
    use super::create_tool_annotations;
    use crate::mcp::annotations::tool_annotations::ToolAnnotations;

    #[test]
    fn marks_reads_deletes_and_known_writes_and_leaves_other_verbs_alone() {
        assert_eq!(create_tool_annotations("get"), Some(ToolAnnotations::READ_ONLY));
        assert_eq!(create_tool_annotations("delete"), Some(ToolAnnotations::DESTRUCTIVE));
        assert_eq!(create_tool_annotations("create"), Some(ToolAnnotations::WRITES));
        assert_eq!(create_tool_annotations("run"), None);
    }
}
