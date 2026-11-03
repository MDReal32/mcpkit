/// jsonc-parser's `Edit`: replace `length` bytes at `offset` with `content`.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct TextEdit {
    pub offset: usize,
    pub length: usize,
    pub content: String,
}
