use crate::host_check::host_check_result::HostCheckResult;
use crate::host_check::read_typed_auth::read_typed_auth;
use crate::host_check::send_version_probe::send_version_probe;
use serde_json::{Map, Value};
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::domain::{apply_domain, is_domain_value};
use usemcpkit_openapi::version::read_version;

/// Finds the primary source of the typed host and asks its server for the version, with the credentials typed so far.
pub async fn run_version_check(manifest: &Manifest, body: &Map<String, Value>) -> Result<HostCheckResult, String> {
    let domain = body
        .get("domain")
        .and_then(Value::as_str)
        .map(str::trim)
        .filter(|domain| !domain.is_empty())
        .ok_or_else(|| "type a host first".to_owned())?;
    if !is_domain_value(domain) {
        return Err(format!("\"{domain}\" must look like host[:port][/path]"));
    }
    let source = manifest
        .openapi
        .iter()
        .find_map(|openapi| openapi.primary_source(Some(domain)))
        .ok_or_else(|| format!("{} does not know the host {domain}", manifest.name))?;
    let label = source.label.clone().unwrap_or_else(|| source.name.clone());
    let Some(versioning) = &source.version else {
        return Ok(HostCheckResult {
            source: source.name.clone(),
            label,
            version: None,
        });
    };
    let auth = read_typed_auth(manifest, body)?;
    let target = apply_domain(manifest, Some(domain));
    let answer = send_version_probe(&target, &versioning.probe.path, auth.as_ref()).await?;
    let version = read_version(&answer, &versioning.probe).map_err(|error| error.0)?;
    Ok(HostCheckResult {
        source: source.name.clone(),
        label,
        version: Some(version),
    })
}
