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
