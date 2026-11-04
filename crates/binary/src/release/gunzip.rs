use crate::binary_error::BinaryError;
use flate2::read::GzDecoder;
use std::io::Read;

pub fn gunzip(bytes: &[u8], label: &str) -> Result<Vec<u8>, BinaryError> {
    let mut archive = Vec::new();
    GzDecoder::new(bytes)
        .read_to_end(&mut archive)
        .map_err(|error| BinaryError(format!("{label}: cannot unpack the tarball: {error}")))?;
    Ok(archive)
}
