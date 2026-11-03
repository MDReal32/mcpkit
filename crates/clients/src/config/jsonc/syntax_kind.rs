/// The tokens jsonc-parser's scanner tells apart.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum SyntaxKind {
    OpenBrace,
    CloseBrace,
    OpenBracket,
    CloseBracket,
    Comma,
    Colon,
    Null,
    True,
    False,
    String,
    Number,
    LineComment,
    BlockComment,
    LineBreak,
    Trivia,
    Unknown,
    Eof,
}

impl SyntaxKind {
    pub fn is_comment(self) -> bool {
        matches!(self, SyntaxKind::LineComment | SyntaxKind::BlockComment)
    }
}
