use serde_json::Value;
use usemcpkit_core::hash::sha256_hex;
use usemcpkit_core::js::to_js_json;

/// Whether a cached file still holds what `sha256` lists. The registry hashes the minified text it ships while the
/// cache keeps it formatted, so the file counts as current when its own text or its minified form matches; a file
/// that is not JSON never does.
pub fn matches_cached_checksum(text: &str, sha256: &str) -> bool {
    if sha256_hex(text) == sha256 {
        return true;
    }
    serde_json::from_str::<Value>(text).is_ok_and(|value| sha256_hex(to_js_json(&value)) == sha256)
}
