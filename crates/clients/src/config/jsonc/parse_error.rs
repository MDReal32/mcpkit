use crate::config::jsonc::parse_error_code::ParseErrorCode;

/// One error of a parse, at the byte offset of the token it was found on.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct ParseError {
    pub code: ParseErrorCode,
    pub offset: usize,
}
