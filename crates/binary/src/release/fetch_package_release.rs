use crate::binary_error::BinaryError;
use crate::consts::{METADATA_TIMEOUT_MS, NOT_FOUND_STATUS, NPM_METADATA_ACCEPT};
use crate::release::package_release::PackageRelease;
use crate::release::read_package_release::read_package_release;
use indexmap::IndexMap;
use serde_json::Value;
use std::time::Duration;
use usemcpkit_http::{HttpClient, HttpRequest};
use usemcpkit_manifest::tool::HttpMethod;

pub async fn fetch_package_release(
    registry: &str,
    package_name: &str,
    version_or_tag: &str,
    http: &dyn HttpClient,
) -> Result<PackageRelease, BinaryError> {
    let url = format!("{registry}/{}", package_name.replacen('/', "%2f", 1));
    let request = HttpRequest {
        url: url.clone(),
        method: HttpMethod::Get,
        headers: IndexMap::from([("Accept".to_owned(), NPM_METADATA_ACCEPT.to_owned())]),
        body: None,
    };
    let response = http
        .send(&request, Duration::from_millis(METADATA_TIMEOUT_MS))
        .await
        .map_err(|error| BinaryError(format!("GET {url} failed: {error}")))?;
    if response.status == NOT_FOUND_STATUS {
        return Err(BinaryError(format!(
            "{package_name} is not published on {registry}; install from a local build with --binary <path>"
        )));
    }
    if !response.is_ok() {
        return Err(BinaryError(format!("GET {url} failed: {}", response.status)));
    }
    let metadata: Value = serde_json::from_str(&response.text())
        .map_err(|error| BinaryError(format!("GET {url}: the registry answered with invalid JSON ({error})")))?;
    read_package_release(&metadata, package_name, version_or_tag)
}
