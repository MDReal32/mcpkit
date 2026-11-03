use mcpkit_core::env::Env;
use mcpkit_core::platform::Platform;
use std::path::{Path, PathBuf};

pub fn resolve_app_data_dir(home_dir: &Path, platform: Platform, env: &Env) -> PathBuf {
    match platform {
        Platform::MacOs => home_dir.join("Library").join("Application Support"),
        Platform::Windows => env
            .get("APPDATA")
            .map(PathBuf::from)
            .unwrap_or_else(|| home_dir.join("AppData").join("Roaming")),
        Platform::Linux => env
            .get("XDG_CONFIG_HOME")
            .map(PathBuf::from)
            .unwrap_or_else(|| home_dir.join(".config")),
    }
}
