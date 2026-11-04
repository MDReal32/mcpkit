use crate::binary_error::BinaryError;
use crate::consts::{HOMEBREW_CELLAR_PATTERN, HOMEBREW_UPGRADE_COMMAND, WINGET_PACKAGE_PATTERN};
use crate::install::package_manager_install::PackageManagerInstall;
use regex::Regex;

/// Maps the resolved path of a running binary to the stable path its package manager keeps up to date.
pub fn find_package_manager_install(real_exec_path: &str) -> Result<Option<PackageManagerInstall>, BinaryError> {
    let compile = |pattern: &str| Regex::new(pattern).map_err(|error| BinaryError(format!("{pattern}: {error}")));
    let homebrew = compile(HOMEBREW_CELLAR_PATTERN)?;
    if let Some(prefix) = homebrew
        .captures(real_exec_path)
        .and_then(|captures| captures.name("prefix"))
    {
        return Ok(Some(PackageManagerInstall {
            manager: "Homebrew".to_owned(),
            path: format!("{}/bin/mcpkit", prefix.as_str()),
            upgrade_command: HOMEBREW_UPGRADE_COMMAND.to_owned(),
        }));
    }
    let winget = compile(WINGET_PACKAGE_PATTERN)?;
    if let Some(id) = winget.captures(real_exec_path).and_then(|captures| captures.name("id")) {
        return Ok(Some(PackageManagerInstall {
            manager: "winget".to_owned(),
            path: real_exec_path.to_owned(),
            upgrade_command: format!("winget upgrade --id {}", id.as_str()),
        }));
    }
    Ok(None)
}
