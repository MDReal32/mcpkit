use crate::AuthError;
use crate::config::{config_file, update_config};
use crate::consts::OAUTH_CLIENTS_KEY;
use crate::json::object_entry;
use crate::oauth::discovery::client_registration::ClientRegistration;
use std::path::Path;

pub async fn save_client_registration(
    home: &Path,
    issuer: &str,
    registration: &ClientRegistration,
) -> Result<(), AuthError> {
    let value = serde_json::to_value(registration)
        .map_err(|error| AuthError(format!("{} {error}", config_file(home).display())))?;
    update_config(home, |config| {
        object_entry(config, OAUTH_CLIENTS_KEY).insert(issuer.to_owned(), value);
    })
    .await?;
    Ok(())
}
