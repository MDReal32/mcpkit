use crate::AuthError;
use serde_json::Value;
use std::path::Path;
use tokio::io::AsyncWriteExt;
use usemcpkit_core::js::to_js_json_pretty;

/// Writes `JSON.stringify(value, null, 2)` through a temp file and a rename, so a crash never leaves a half-written
/// file; on unix the folder is created 0700 and the file 0600.
pub async fn write_json_file(file: &Path, value: &Value) -> Result<(), AuthError> {
    let fail = |error: std::io::Error| AuthError(format!("Cannot write {}: {error}", file.display()));
    if let Some(dir) = file.parent() {
        let mut dir_builder = tokio::fs::DirBuilder::new();
        dir_builder.recursive(true);
        #[cfg(unix)]
        dir_builder.mode(crate::consts::PRIVATE_DIR_MODE);
        dir_builder.create(dir).await.map_err(fail)?;
    }
    let mut temp_name = file.as_os_str().to_owned();
    temp_name.push(format!(".{}.tmp", std::process::id()));
    let temp_file = Path::new(&temp_name);
    let mut options = tokio::fs::OpenOptions::new();
    options.write(true).create(true).truncate(true);
    #[cfg(unix)]
    options.mode(crate::consts::PRIVATE_FILE_MODE);
    let mut handle = options.open(temp_file).await.map_err(fail)?;
    handle
        .write_all(format!("{}\n", to_js_json_pretty(value)).as_bytes())
        .await
        .map_err(fail)?;
    handle.flush().await.map_err(fail)?;
    drop(handle);
    tokio::fs::rename(temp_file, file).await.map_err(fail)
}
