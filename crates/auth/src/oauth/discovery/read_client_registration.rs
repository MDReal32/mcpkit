use crate::AuthError;
use crate::config::{config_file, load_config};
use crate::consts::OAUTH_CLIENTS_KEY;
use crate::oauth::discovery::client_registration::ClientRegistration;
use serde_json::{Map, Value};
use std::path::Path;

/// Every saved registration by issuer; none when the config has no `oauthClients`.
pub async fn read_client_registrations(home: &Path) -> Result<Map<String, Value>, AuthError> {
    let config = load_config(home).await?;
    Ok(config
        .get(OAUTH_CLIENTS_KEY)
        .and_then(Value::as_object)
        .cloned()
        .unwrap_or_default())
}

pub async fn read_client_registration(home: &Path, issuer: &str) -> Result<Option<ClientRegistration>, AuthError> {
    let registrations = read_client_registrations(home).await?;
    let Some(value) = registrations.get(issuer) else {
        return Ok(None);
    };
    serde_json::from_value(value.clone()).map(Some).map_err(|error| {
        AuthError(format!(
            "{} holds an invalid registration for {issuer}: {error}",
            config_file(home).display()
        ))
    })
}
