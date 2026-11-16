use crate::config::{config_file, load_config, read_server_config};
use crate::consts::SIGN_IN_KEY;
use crate::token_store::stored_token::StoredToken;
use crate::{AuthError, ServerKey};
use std::path::Path;

/// The server's sign-in from the config; a sign-in that is not a token fails instead of being overwritten.
pub async fn read_stored_token(home: &Path, server: &ServerKey) -> Result<Option<StoredToken>, AuthError> {
    let config = load_config(home).await?;
    let Some(sign_in) = read_server_config(&config, server).and_then(|entry| entry.get(SIGN_IN_KEY)) else {
        return Ok(None);
    };
    serde_json::from_value(sign_in.clone()).map(Some).map_err(|error| {
        AuthError(format!(
            "{} holds an invalid sign-in for {server}: {error}",
            config_file(home).display()
        ))
    })
}
