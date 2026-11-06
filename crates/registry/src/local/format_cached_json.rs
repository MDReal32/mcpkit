use crate::registry_error::RegistryError;
use serde_json::Value;
use usemcpkit_core::js::to_js_json_pretty;

/// A downloaded registry file as the cache keeps it: two-space JSON with a final newline, however the registry
/// shipped it (minified since 0.12), so people can read it.
pub fn format_cached_json(text: &str) -> Result<String, RegistryError> {
    let value: Value = serde_json::from_str(text).map_err(|error| RegistryError::failed(error.to_string()))?;
    Ok(format!("{}\n", to_js_json_pretty(&value)))
}
