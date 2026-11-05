use crate::registry_error::RegistryError;
use std::io::ErrorKind;
use std::path::Path;

/// `None` when the file does not exist; any other failure to read it is an error.
pub async fn read_text_if_present(file: &Path) -> Result<Option<String>, RegistryError> {
    match tokio::fs::read_to_string(file).await {
        Ok(text) => Ok(Some(text)),
        Err(error) if error.kind() == ErrorKind::NotFound => Ok(None),
        Err(error) => Err(RegistryError::failed(format!("{}: {error}", file.display()))),
    }
}
