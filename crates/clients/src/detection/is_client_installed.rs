use crate::client_context::ClientContext;
use crate::client_definition::ClientDefinition;
use crate::client_error::ClientError;
use crate::paths::path_exists;

pub fn is_client_installed(definition: &ClientDefinition, context: &ClientContext) -> Result<bool, ClientError> {
    for path in (definition.detect_paths)(context) {
        if path_exists(&path)? {
            return Ok(true);
        }
    }
    Ok(false)
}
