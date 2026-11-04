use crate::binary_error::BinaryError;
use crate::tar::consts::{TAR_BLOCK_SIZE, TAR_FILE_TYPES, TAR_TYPE_OFFSET};
use crate::tar::read_tar_entry_path::read_tar_entry_path;
use crate::tar::read_tar_entry_size::read_tar_entry_size;

/// Reads one regular file out of an uncompressed ustar archive, as produced by `npm pack`.
pub fn extract_tar_file(archive: &[u8], entry_path: &str) -> Result<Vec<u8>, BinaryError> {
    let mut offset = 0;
    while offset + TAR_BLOCK_SIZE <= archive.len() {
        let header = &archive[offset..offset + TAR_BLOCK_SIZE];
        if header.iter().all(|byte| *byte == 0) {
            break;
        }
        let size = read_tar_entry_size(header)?;
        let data_start = offset + TAR_BLOCK_SIZE;
        let is_file = TAR_FILE_TYPES.contains(&header[TAR_TYPE_OFFSET]);
        if is_file && read_tar_entry_path(header) == entry_path {
            if data_start + size > archive.len() {
                return Err(BinaryError(format!("tarball entry {entry_path} is truncated")));
            }
            return Ok(archive[data_start..data_start + size].to_vec());
        }
        offset = data_start + size.div_ceil(TAR_BLOCK_SIZE) * TAR_BLOCK_SIZE;
    }
    Err(BinaryError(format!("tarball has no {entry_path}")))
}
