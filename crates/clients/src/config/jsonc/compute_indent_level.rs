/// jsonc-parser's `computeIndentLevel`: the leading spaces and tabs of `content`, in steps of `tab_size`.
pub fn compute_indent_level(content: &str, tab_size: usize) -> usize {
    let width: usize = content
        .bytes()
        .map_while(|byte| match byte {
            b' ' => Some(1),
            b'\t' => Some(tab_size),
            _ => None,
        })
        .sum();
    width / tab_size
}
