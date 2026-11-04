use crate::paths::resolve_app_data_dir;
use std::path::PathBuf;
use usemcpkit_core::env::Env;
use usemcpkit_core::platform::Platform;

/// Where the clients of this user keep their files.
#[derive(Clone, Debug)]
pub struct ClientContext {
    pub home_dir: PathBuf,
    /// macOS `~/Library/Application Support`, Windows `%APPDATA%`, Linux `$XDG_CONFIG_HOME` or `~/.config`.
    pub app_data_dir: PathBuf,
    /// `$XDG_CONFIG_HOME` or `~/.config` on every OS; several cross-platform CLIs keep their config there.
    pub xdg_config_dir: PathBuf,
    pub platform: Platform,
    pub env: Env,
}

impl ClientContext {
    pub fn new(env: Env, platform: Platform, home_dir: PathBuf) -> Self {
        let app_data_dir = resolve_app_data_dir(&home_dir, platform, &env);
        let xdg_config_dir = env
            .get("XDG_CONFIG_HOME")
            .map(PathBuf::from)
            .unwrap_or_else(|| home_dir.join(".config"));
        ClientContext {
            home_dir,
            app_data_dir,
            xdg_config_dir,
            platform,
            env,
        }
    }
}
