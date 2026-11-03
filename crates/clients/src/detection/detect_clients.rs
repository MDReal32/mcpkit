use crate::client_context::ClientContext;
use crate::client_definition::ClientDefinition;
use crate::client_error::ClientError;
use crate::detected_client::DetectedClient;
use crate::detection::inspect_client::inspect_client;
use crate::detection::is_client_installed::is_client_installed;

/// Clients installed for this user, in the order of `definitions` (`CLIENT_DEFINITIONS` for every client).
pub fn detect_clients(
    context: &ClientContext,
    definitions: &[ClientDefinition],
) -> Result<Vec<DetectedClient>, ClientError> {
    let mut detected = Vec::new();
    for definition in definitions {
        if is_client_installed(definition, context)? {
            detected.push(inspect_client(definition, context));
        }
    }
    Ok(detected)
}
