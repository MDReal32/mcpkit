use sha2::{Digest, Sha256};

/// Lowercase hex SHA-256, the form the registry lists its checksums in.
pub fn sha256_hex(data: impl AsRef<[u8]>) -> String {
    Sha256::digest(data).iter().map(|byte| format!("{byte:02x}")).collect()
}

#[cfg(test)]
mod tests {
    use super::sha256_hex;

    #[test]
    fn hashes_like_node_crypto() {
        assert_eq!(
            sha256_hex("abc"),
            "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
        );
    }
}
