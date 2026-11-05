use crate::cli::consts::VERSION;
use crate::cli::update::launch_binary::LaunchBinary;
use std::path::{Path, PathBuf};
use usemcpkit_binary::{BinaryContext, BinarySource, detect_package_manager_install, install_binary};

/// A Homebrew or winget binary is used where it is so its package manager keeps updating it; any other runner is
/// copied to ~/.usemcpkit/bin with the server next to it.
pub fn prepare_launch_binary(context: &BinaryContext, binary: Option<PathBuf>) -> Result<LaunchBinary, String> {
    let managed = match binary {
        None => detect_package_manager_install(&context.exec_path).map_err(|error| error.0)?,
        Some(_) => None,
    };
    if let Some(managed) = managed {
        let exists = Path::new(&managed.path)
            .try_exists()
            .map_err(|error| format!("cannot read {}: {error}", managed.path))?;
        if !exists {
            return Err(format!(
                "{} does not exist; relink usemcpkit with {} and run \"usemcpkit\" again",
                managed.path, managed.manager
            ));
        }
        println!("Using usemcpkit {VERSION} from {} at {}", managed.manager, managed.path);
        return Ok(LaunchBinary {
            path: PathBuf::from(managed.path),
            update_hint: format!("Update it with \"{}\".", managed.upgrade_command),
            managed: true,
        });
    }
    let source = BinarySource {
        path: binary,
        version: VERSION.to_owned(),
    };
    let installed = install_binary(context, &source).map_err(|error| error.0)?;
    println!(
        "usemcpkit {} installed at {}",
        installed.version,
        installed.path.display()
    );
    Ok(LaunchBinary {
        path: installed.path,
        update_hint: "It updates itself in the background.".to_owned(),
        managed: false,
    })
}
