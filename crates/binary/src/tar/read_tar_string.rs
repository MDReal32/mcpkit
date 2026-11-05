use crate::tar::tar_field::TarField;

/// The field's bytes up to the first NUL, decoded as UTF-8 with invalid bytes replaced.
pub fn read_tar_string(header: &[u8], field: TarField) -> String {
    let bytes = &header[field.offset..field.offset + field.length];
    let end = bytes.iter().position(|byte| *byte == 0).unwrap_or(bytes.len());
    String::from_utf8_lossy(&bytes[..end]).into_owned()
}
