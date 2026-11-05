use crate::config::update_server_config::update_server_config;
use crate::json::object_entry;
use crate::{AuthError, ServerKey};
use serde_json::Value;
use std::path::{Path, PathBuf};

/// Makes the host a known host and, with a project, binds the project to it.
pub async fn save_server_domain(
    home: &Path,
    server: &ServerKey,
    domain: &str,
    project_key: Option<&str>,
) -> Result<PathBuf, AuthError> {
    update_server_config(home, server, |current| {
        object_entry(object_entry(current, "hosts"), domain);
        if let Some(project_key) = project_key {
            object_entry(current, "projects").insert(project_key.to_owned(), Value::String(domain.to_owned()));
        }
    })
    .await
}
