use crate::client_error::ClientError;
use std::io::ErrorKind;
use std::path::Path;

/// A missing config file reads as empty, so the first entry creates it. Bytes that are not UTF-8 become U+FFFD, as
/// Node's `readFile(path, "utf8")` reads them.
pub fn read_config_text(path: &Path) -> Result<String, ClientError> {
    match std::fs::read(path) {
        Ok(bytes) => Ok(String::from_utf8_lossy(&bytes).into_owned()),
        Err(error) if error.kind() == ErrorKind::NotFound => Ok(String::new()),
        Err(error) => Err(ClientError(format!("could not read {}: {error}", path.display()))),
    }
}
