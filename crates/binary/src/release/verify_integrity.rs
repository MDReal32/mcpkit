use crate::binary_error::BinaryError;
use crate::consts::SUPPORTED_INTEGRITY_ALGORITHMS;
use base64::Engine;
use base64::engine::general_purpose::STANDARD;
use mcpkit_core::js::is_js_whitespace;
use sha2::{Digest, Sha256, Sha384, Sha512};

/// Checks bytes against a Subresource Integrity string as npm publishes it (`sha512-<base64>`).
pub fn verify_integrity(bytes: &[u8], integrity: &str, label: &str) -> Result<(), BinaryError> {
    let hashes: Vec<(&str, &str)> = integrity
        .split(is_js_whitespace)
        .map(|entry| {
            let mut parts = entry.split('-');
            (parts.next().unwrap_or_default(), parts.next().unwrap_or_default())
        })
        .filter(|(algorithm, _)| SUPPORTED_INTEGRITY_ALGORITHMS.contains(algorithm))
        .collect();
    if hashes.is_empty() {
        return Err(BinaryError(format!("{label}: unsupported integrity \"{integrity}\"")));
    }
    let matches = hashes.iter().any(|(algorithm, expected)| {
        let digest = match *algorithm {
            "sha512" => Sha512::digest(bytes).to_vec(),
            "sha384" => Sha384::digest(bytes).to_vec(),
            _ => Sha256::digest(bytes).to_vec(),
        };
        STANDARD.encode(digest) == *expected
    });
    if !matches {
        return Err(BinaryError(format!(
            "{label}: download does not match its published integrity"
        )));
    }
    Ok(())
}
