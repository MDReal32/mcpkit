use crate::cli::consts::{EXIT_FAILURE, EXIT_SUCCESS};
use crate::cli::update::create_binary_context::create_binary_context;
use crate::cli::update::read_binary_version::read_binary_version;
use usemcpkit_binary::{
    BinaryUpdateResult, detect_package_manager_install, resolve_installed_binary_path, update_binary,
};

/// Homebrew and winget installs are left to their package manager. Otherwise replaces ~/.usemcpkit/bin/usemcpkit, and the
/// server next to it, with the latest published release.
pub async fn upgrade_binary() -> Result<i32, String> {
    let context = create_binary_context()?;
    if let Some(managed) = detect_package_manager_install(&context.exec_path).map_err(|error| error.0)? {
        println!(
            "usemcpkit was installed with {}; update it with \"{}\"",
            managed.manager, managed.upgrade_command
        );
        return Ok(EXIT_SUCCESS);
    }
    let path = resolve_installed_binary_path(&context.home_dir, context.target);
    let exists = path
        .try_exists()
        .map_err(|error| format!("cannot read {}: {error}", path.display()))?;
    if !exists {
        eprintln!(
            "usemcpkit is not installed at {}: run \"usemcpkit install\" first",
            path.display()
        );
        return Ok(EXIT_FAILURE);
    }
    let version = read_binary_version(&path).await?;
    match update_binary(&context, &path, &version)
        .await
        .map_err(|error| error.0)?
    {
        BinaryUpdateResult::Updated { from, to, .. } => {
            println!("updated {from} -> {to}. Restart the clients to use it.");
        }
        BinaryUpdateResult::UpToDate { version } => println!("usemcpkit {version} is the latest version"),
    }
    Ok(EXIT_SUCCESS)
}
