use percent_encoding::{AsciiSet, NON_ALPHANUMERIC};

/// JavaScript prints numbers at least this large with an exponent.
pub const EXPONENT_ABOVE: f64 = 1e21;

/// JavaScript prints numbers smaller than this, other than zero, with an exponent.
pub const EXPONENT_BELOW: f64 = 1e-6;

/// `Number.MAX_SAFE_INTEGER`: whole floats up to it are written as integers without losing a digit.
pub const MAX_EXACT_INTEGER: f64 = 9_007_199_254_740_991.0;

/// What `encodeURIComponent` escapes: everything but letters, digits and `-_.!~*'()`.
pub const URI_COMPONENT: &AsciiSet = &NON_ALPHANUMERIC
    .remove(b'-')
    .remove(b'_')
    .remove(b'.')
    .remove(b'!')
    .remove(b'~')
    .remove(b'*')
    .remove(b'\'')
    .remove(b'(')
    .remove(b')');

/// What `String.prototype.trim` and the regular expression `\s` take as whitespace: the ECMAScript WhiteSpace and
/// LineTerminator characters, which leave out U+0085 and take in U+FEFF, unlike `char::is_whitespace`.
pub const JS_WHITESPACE: &[char] = &[
    '\t', '\n', '\u{b}', '\u{c}', '\r', ' ', '\u{a0}', '\u{1680}', '\u{2000}', '\u{2001}', '\u{2002}', '\u{2003}',
    '\u{2004}', '\u{2005}', '\u{2006}', '\u{2007}', '\u{2008}', '\u{2009}', '\u{200a}', '\u{2028}', '\u{2029}',
    '\u{202f}', '\u{205f}', '\u{3000}', '\u{feff}',
];
