use crate::binary_error::BinaryError;
use crate::binary_pair::BinaryPair;
use crate::consts::{DOWNLOAD_TIMEOUT_MS, TARBALL_ROOT};
use crate::platform::{BINARY_NAME, PLATFORM_PACKAGE_BIN_DIR, SERVER_BINARY_NAME, Target, to_binary_file_name};
use crate::release::gunzip::gunzip;
use crate::release::package_release::PackageRelease;
use crate::release::verify_integrity::verify_integrity;
use crate::tar::extract_tar_file;
use indexmap::IndexMap;
use mcpkit_http::{HttpClient, HttpRequest};
use mcpkit_manifest::tool::HttpMethod;
use std::time::Duration;

/// Downloads a release tarball, checks it against its published integrity and reads both binaries out of it; nothing
/// is returned unless both are there.
pub async fn download_release_binaries(
    release: &PackageRelease,
    target: Target,
    http: &dyn HttpClient,
) -> Result<BinaryPair, BinaryError> {
    let request = HttpRequest {
        url: release.tarball.clone(),
        method: HttpMethod::Get,
        headers: IndexMap::new(),
        body: None,
    };
    let response = http
        .send(&request, Duration::from_millis(DOWNLOAD_TIMEOUT_MS))
        .await
        .map_err(|error| BinaryError(format!("GET {} failed: {error}", release.tarball)))?;
    if !response.is_ok() {
        return Err(BinaryError(format!(
            "GET {} failed: {}",
            release.tarball, response.status
        )));
    }
    verify_integrity(&response.body, &release.integrity, &release.tarball)?;
    let archive = gunzip(&response.body, &release.tarball)?;
    let entry_path = |name: &str| {
        format!(
            "{TARBALL_ROOT}/{PLATFORM_PACKAGE_BIN_DIR}/{}",
            to_binary_file_name(target, name)
        )
    };
    Ok(BinaryPair {
        runner: extract_tar_file(&archive, &entry_path(BINARY_NAME))?,
        server: extract_tar_file(&archive, &entry_path(SERVER_BINARY_NAME))?,
    })
}
