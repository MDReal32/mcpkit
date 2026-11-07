use crate::AuthError;
use crate::files::write_json_file;
use crate::oauth::discovery::client_registration::ClientRegistration;
use crate::oauth::discovery::clients_file::clients_file;
use crate::oauth::discovery::read_client_registration::read_client_registrations;
use serde_json::Value;
use std::path::Path;

pub async fn save_client_registration(
    home: &Path,
    issuer: &str,
    registration: &ClientRegistration,
) -> Result<(), AuthError> {
    let file = clients_file(home);
    let mut registrations = read_client_registrations(home).await?;
    let value = serde_json::to_value(registration).map_err(|error| AuthError(format!("{} {error}", file.display())))?;
    registrations.insert(issuer.to_owned(), value);
    write_json_file(&file, &Value::Object(registrations)).await
}
