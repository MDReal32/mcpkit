/// jsonc-parser's `ParseErrorCode`.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ParseErrorCode {
    InvalidSymbol,
    InvalidNumberFormat,
    PropertyNameExpected,
    ValueExpected,
    ColonExpected,
    CommaExpected,
    CloseBraceExpected,
    CloseBracketExpected,
    EndOfFileExpected,
    UnexpectedEndOfComment,
    UnexpectedEndOfString,
    UnexpectedEndOfNumber,
    InvalidUnicode,
    InvalidEscapeCharacter,
    InvalidCharacter,
}

impl ParseErrorCode {
    /// What `printParseErrorCode` prints for it.
    pub fn name(self) -> &'static str {
        match self {
            ParseErrorCode::InvalidSymbol => "InvalidSymbol",
            ParseErrorCode::InvalidNumberFormat => "InvalidNumberFormat",
            ParseErrorCode::PropertyNameExpected => "PropertyNameExpected",
            ParseErrorCode::ValueExpected => "ValueExpected",
            ParseErrorCode::ColonExpected => "ColonExpected",
            ParseErrorCode::CommaExpected => "CommaExpected",
            ParseErrorCode::CloseBraceExpected => "CloseBraceExpected",
            ParseErrorCode::CloseBracketExpected => "CloseBracketExpected",
            ParseErrorCode::EndOfFileExpected => "EndOfFileExpected",
            ParseErrorCode::UnexpectedEndOfComment => "UnexpectedEndOfComment",
            ParseErrorCode::UnexpectedEndOfString => "UnexpectedEndOfString",
            ParseErrorCode::UnexpectedEndOfNumber => "UnexpectedEndOfNumber",
            ParseErrorCode::InvalidUnicode => "InvalidUnicode",
            ParseErrorCode::InvalidEscapeCharacter => "InvalidEscapeCharacter",
            ParseErrorCode::InvalidCharacter => "InvalidCharacter",
        }
    }
}
