use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::binary_update_result::BinaryUpdateResult;
use crate::consts::LATEST_TAG;
use crate::install::write_binary_pair;
use crate::release::{download_release_binaries, fetch_target_release};
use mcpkit_core::versions::compare_versions;
use std::cmp::Ordering;
use std::path::Path;

/// Replaces the runner at `path`, and the server next to it, with the latest published release when it is newer than
/// `current_version`.
pub async fn update_binary(
    context: &BinaryContext,
    path: &Path,
    current_version: &str,
) -> Result<BinaryUpdateResult, BinaryError> {
    let release = fetch_target_release(context, LATEST_TAG).await?;
    if compare_versions(&release.version, current_version) != Ordering::Greater {
        return Ok(BinaryUpdateResult::UpToDate {
            version: current_version.to_owned(),
        });
    }
    let binaries = download_release_binaries(&release, context.target, context.http.as_ref()).await?;
    write_binary_pair(path, context.target, &binaries)?;
    Ok(BinaryUpdateResult::Updated {
        from: current_version.to_owned(),
        to: release.version,
        path: path.to_path_buf(),
    })
}
