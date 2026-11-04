use crate::binary_error::BinaryError;
use crate::release::package_release::PackageRelease;
use serde_json::Value;

/// Picks one version's dist info out of npm package metadata; `version_or_tag` may be a dist-tag such as `latest`.
pub fn read_package_release(
    metadata: &Value,
    package_name: &str,
    version_or_tag: &str,
) -> Result<PackageRelease, BinaryError> {
    let Some(versions) = metadata.get("versions").and_then(Value::as_object) else {
        return Err(BinaryError(format!(
            "{package_name}: the registry answered without a versions list"
        )));
    };
    let tagged = metadata
        .get("dist-tags")
        .and_then(Value::as_object)
        .and_then(|tags| tags.get(version_or_tag))
        .and_then(Value::as_str);
    let version = tagged.unwrap_or(version_or_tag);
    let dist = versions.get(version).and_then(|entry| entry.get("dist"));
    let tarball = dist.and_then(|dist| dist.get("tarball")).and_then(Value::as_str);
    let integrity = dist.and_then(|dist| dist.get("integrity")).and_then(Value::as_str);
    let (Some(tarball), Some(integrity)) = (tarball, integrity) else {
        return Err(BinaryError(format!("{package_name}@{version} is not published")));
    };
    Ok(PackageRelease {
        version: version.to_owned(),
        tarball: tarball.to_owned(),
        integrity: integrity.to_owned(),
    })
}
