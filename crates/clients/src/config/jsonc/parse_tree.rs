use crate::config::jsonc::json_tree::JsonTree;
use crate::config::jsonc::tree_parser::TreeParser;

/// jsonc-parser's `parseTree(text, errors, { allowTrailingComma })`; comments are always allowed.
pub fn parse_tree(text: &str, allow_trailing_comma: bool) -> JsonTree {
    TreeParser::new(text, allow_trailing_comma).parse()
}
