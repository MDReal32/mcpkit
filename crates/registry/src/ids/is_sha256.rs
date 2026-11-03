const SHA256_HEX_LENGTH: usize = 64;

/// `^[0-9a-f]{64}$`.
pub fn is_sha256(text: &str) -> bool {
    text.len() == SHA256_HEX_LENGTH
        && text
            .chars()
            .all(|character| character.is_ascii_digit() || ('a'..='f').contains(&character))
}
