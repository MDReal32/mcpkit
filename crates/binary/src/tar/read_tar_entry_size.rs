use crate::binary_error::BinaryError;
use crate::tar::consts::TAR_SIZE_FIELD;
use crate::tar::read_tar_string::read_tar_string;
use mcpkit_core::js::js_trim;

/// The octal size field read like `Number.parseInt(field.trim() || "0", 8)`: the digits stop at the first character
/// that is not octal, and a field without any is invalid.
pub fn read_tar_entry_size(header: &[u8]) -> Result<usize, BinaryError> {
    let invalid = || BinaryError("tarball has an invalid entry size".to_owned());
    let field = read_tar_string(header, TAR_SIZE_FIELD);
    let trimmed = match js_trim(&field) {
        "" => "0",
        text => text,
    };
    let (negative, unsigned) = match trimmed.strip_prefix('-') {
        Some(rest) => (true, rest),
        None => (false, trimmed.strip_prefix('+').unwrap_or(trimmed)),
    };
    let digits_end = unsigned
        .find(|character: char| !('0'..='7').contains(&character))
        .unwrap_or(unsigned.len());
    let size = u64::from_str_radix(&unsigned[..digits_end], 8).map_err(|_| invalid())?;
    if negative && size != 0 {
        return Err(invalid());
    }
    usize::try_from(size).map_err(|_| invalid())
}
