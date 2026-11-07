use crate::window_app::consts::{WINDOW_APP_BINARY, WINDOW_APP_DIR, WINDOW_APP_FILE, WINDOW_APP_FOLDER_HASH_LENGTH};
use std::io::Write;
use std::path::{Path, PathBuf};
use usemcpkit_core::hash::sha256_hex;

/// The path of the credentials window program inside `home`, written from the copy embedded in this binary when it is
/// not there yet. The folder is named by the version and the checksum of the embedded program, so a new build never
/// runs an older program, and the folders of other builds are removed once this one is in place.
pub fn install_window_app(home: &Path) -> Result<PathBuf, String> {
    let checksum = sha256_hex(WINDOW_APP_BINARY);
    let folder_name = format!(
        "{}-{}",
        env!("CARGO_PKG_VERSION"),
        &checksum[..WINDOW_APP_FOLDER_HASH_LENGTH]
    );
    let root = home.join(WINDOW_APP_DIR);
    let program = root.join(&folder_name).join(WINDOW_APP_FILE);
    if !program.is_file() {
        write_program(&program)?;
    }
    remove_other_builds(&root, &folder_name)?;
    Ok(program)
}

fn write_program(program: &Path) -> Result<(), String> {
    let folder = program.parent().ok_or("the window app has no folder")?;
    std::fs::create_dir_all(folder).map_err(|error| format!("cannot create {}: {error}", folder.display()))?;
    let partial = folder.join(format!("{WINDOW_APP_FILE}.{}.partial", std::process::id()));
    let mut options = std::fs::OpenOptions::new();
    options.write(true).create(true).truncate(true);
    #[cfg(unix)]
    {
        use crate::window_app::consts::WINDOW_APP_FILE_MODE;
        use std::os::unix::fs::OpenOptionsExt;
        options.mode(WINDOW_APP_FILE_MODE);
    }
    let mut file = options
        .open(&partial)
        .map_err(|error| format!("cannot write {}: {error}", partial.display()))?;
    file.write_all(WINDOW_APP_BINARY)
        .and_then(|()| file.sync_all())
        .map_err(|error| format!("cannot write {}: {error}", partial.display()))?;
    drop(file);
    std::fs::rename(&partial, program).map_err(|error| format!("cannot install {}: {error}", program.display()))
}

fn remove_other_builds(root: &Path, keep: &str) -> Result<(), String> {
    let entries = std::fs::read_dir(root).map_err(|error| format!("cannot read {}: {error}", root.display()))?;
    for entry in entries {
        let path = entry
            .map_err(|error| format!("cannot read {}: {error}", root.display()))?
            .path();
        if path.file_name().is_some_and(|name| name != keep) && path.is_dir() {
            std::fs::remove_dir_all(&path).map_err(|error| format!("cannot remove {}: {error}", path.display()))?;
        }
    }
    Ok(())
}
