use crate::config::jsonc::parse_error_code::ParseErrorCode;

/// What was wrong with the last token jsonc-parser's scanner read.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ScanError {
    UnexpectedEndOfComment,
    UnexpectedEndOfString,
    UnexpectedEndOfNumber,
    InvalidUnicode,
    InvalidEscapeCharacter,
    InvalidCharacter,
}

impl ScanError {
    pub fn parse_error_code(self) -> ParseErrorCode {
        match self {
            ScanError::UnexpectedEndOfComment => ParseErrorCode::UnexpectedEndOfComment,
            ScanError::UnexpectedEndOfString => ParseErrorCode::UnexpectedEndOfString,
            ScanError::UnexpectedEndOfNumber => ParseErrorCode::UnexpectedEndOfNumber,
            ScanError::InvalidUnicode => ParseErrorCode::InvalidUnicode,
            ScanError::InvalidEscapeCharacter => ParseErrorCode::InvalidEscapeCharacter,
            ScanError::InvalidCharacter => ParseErrorCode::InvalidCharacter,
        }
    }
}
