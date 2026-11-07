use crate::AuthError;
use crate::files::{parse_json_file, read_text_if_exists};
use crate::oauth::discovery::client_registration::ClientRegistration;
use crate::oauth::discovery::clients_file::clients_file;
use serde_json::{Map, Value};
use std::path::Path;

/// Every saved registration by issuer; a missing file means none, a malformed one fails instead of being overwritten.
pub async fn read_client_registrations(home: &Path) -> Result<Map<String, Value>, AuthError> {
    let file = clients_file(home);
    let Some(text) = read_text_if_exists(&file).await? else {
        return Ok(Map::new());
    };
    match parse_json_file(&file, &text)? {
        Value::Object(registrations) => Ok(registrations),
        _ => Err(AuthError(format!(
            "{} is not a valid OAuth clients file",
            file.display()
        ))),
    }
}

pub async fn read_client_registration(home: &Path, issuer: &str) -> Result<Option<ClientRegistration>, AuthError> {
    let registrations = read_client_registrations(home).await?;
    let Some(value) = registrations.get(issuer) else {
        return Ok(None);
    };
    serde_json::from_value(value.clone()).map(Some).map_err(|error| {
        AuthError(format!(
            "{} holds an invalid registration for {issuer}: {error}",
            clients_file(home).display()
        ))
    })
}
