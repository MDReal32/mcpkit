/// Whether the byte at `offset` ends a line, as jsonc-parser's `isEOL` reads it.
pub fn is_eol(text: &[u8], offset: usize) -> bool {
    matches!(text.get(offset), Some(b'\r' | b'\n'))
}
