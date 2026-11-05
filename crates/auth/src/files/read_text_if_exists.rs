use crate::AuthError;
use std::io::ErrorKind;
use std::path::Path;

/// A missing file is `None`; any other failure to read it is an error.
pub async fn read_text_if_exists(file: &Path) -> Result<Option<String>, AuthError> {
    match tokio::fs::read_to_string(file).await {
        Ok(text) => Ok(Some(text)),
        Err(error) if error.kind() == ErrorKind::NotFound => Ok(None),
        Err(error) => Err(AuthError(format!("Cannot read {}: {error}", file.display()))),
    }
}
