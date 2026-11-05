use crate::client_error::ClientError;
use crate::config::jsonc::{JsonTree, parse_tree, to_utf16_offset};
use std::path::Path;
use usemcpkit_core::js::js_trim;

/// Parses JSON with comments and trailing commas; fails instead of editing a file it cannot read. An empty file reads
/// as `{}`. The offset in the error is in UTF-16 code units, as the TypeScript CLI reports it.
pub fn parse_json_config(text: &str, path: &Path) -> Result<JsonTree, ClientError> {
    let source = if js_trim(text).is_empty() { "{}" } else { text };
    let tree = parse_tree(source, true);
    match tree.errors.first() {
        Some(first) => Err(ClientError(format!(
            "{}: invalid JSON ({} at offset {})",
            path.display(),
            first.code.name(),
            to_utf16_offset(source, first.offset)
        ))),
        None => Ok(tree),
    }
}
