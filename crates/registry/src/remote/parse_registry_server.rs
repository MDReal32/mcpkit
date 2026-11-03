use crate::ids::{is_sha256, parse_server_id};
use mcpkit_manifest::registry::RegistryServer;
use serde_json::Value;

const SERVER_ID_PATTERN: &str = "/^[a-z][a-z0-9-]*:[a-z][a-z0-9_]*$/";

/// One entry of the index, with the messages the CLI reports for a broken one.
pub fn parse_registry_server(entry: &Value, position: usize) -> Result<RegistryServer, String> {
    let label = format!("registry index servers[{position}]");
    let Value::Object(fields) = entry else {
        return Err(format!("{label} must be an object"));
    };
    let id = match fields.get("id").and_then(Value::as_str) {
        Some(id) if parse_server_id(id).is_some() => id,
        _ => return Err(format!("{label}.id must match {SERVER_ID_PATTERN}")),
    };
    let (Some(version), Some(url)) = (
        fields.get("version").and_then(Value::as_str),
        fields.get("url").and_then(Value::as_str),
    ) else {
        return Err(format!("{label} ({id}) needs string \"version\" and \"url\""));
    };
    let sha256 = match fields.get("sha256").and_then(Value::as_str) {
        Some(sha256) if is_sha256(sha256) => sha256,
        _ => return Err(format!("{label} ({id}).sha256 must be a hex SHA-256")),
    };
    let description = match fields.get("description") {
        None => None,
        Some(Value::String(description)) => Some(description.clone()),
        Some(_) => return Err(format!("{label} ({id}).description must be a string")),
    };
    let upstream = match fields.get("upstream") {
        None => false,
        Some(Value::Bool(upstream)) => *upstream,
        Some(_) => return Err(format!("{label} ({id}).upstream must be a boolean")),
    };
    Ok(RegistryServer {
        id: id.to_owned(),
        version: version.to_owned(),
        url: url.to_owned(),
        sha256: sha256.to_owned(),
        description,
        upstream,
    })
}
