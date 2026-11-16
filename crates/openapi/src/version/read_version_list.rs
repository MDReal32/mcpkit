use crate::OpenApiError;
use crate::version::capture_version::capture_version;
use crate::version::read_json_path::read_json_path;
use serde_json::Value;
use usemcpkit_manifest::openapi::VersionList;

/// The versions a listing names: each item of the array at `items` (or each key of the object there), read at `field`
/// when the items are objects, kept when `match` finds a version in it.
pub fn read_version_list(answer: &Value, list: &VersionList) -> Result<Vec<String>, OpenApiError> {
    let items = read_json_path(answer, list.items.as_deref().unwrap_or_default()).ok_or_else(|| {
        OpenApiError(format!(
            "{} has no \"{}\"",
            list.url,
            list.items.as_deref().unwrap_or_default()
        ))
    })?;
    let texts: Vec<String> = match items {
        Value::Array(entries) => entries
            .iter()
            .filter_map(|entry| match (&list.field, entry) {
                (Some(field), _) => read_json_path(entry, field).and_then(Value::as_str).map(str::to_owned),
                (None, Value::String(text)) => Some(text.clone()),
                (None, _) => None,
            })
            .collect(),
        Value::Object(fields) => fields.keys().cloned().collect(),
        _ => return Err(OpenApiError(format!("{} does not list versions", list.url))),
    };
    let mut versions = Vec::new();
    for text in texts {
        if let Some(version) = capture_version(&list.pattern, &text)?
            && !versions.contains(&version)
        {
            versions.push(version);
        }
    }
    Ok(versions)
}
