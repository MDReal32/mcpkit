use std::path::Path;
use usemcpkit_auth::config::adopt_legacy_home;
use usemcpkit_core::env::Env;
use usemcpkit_core::home::resolve_legacy_home_dir;

/// Brings the credentials an older `mcpkit` release saved into the usemcpkit home before the first call reads them. A
/// failed copy only costs a new prompt for them, so the server reports it and serves on.
pub async fn adopt_legacy_credentials(env: &Env, home: &Path) {
    let Some(legacy_home) = resolve_legacy_home_dir(env) else {
        return;
    };
    match adopt_legacy_home(home, &legacy_home).await {
        Ok(true) => eprintln!(
            "usemcpkit: copied the saved credentials from {} to {}",
            legacy_home.display(),
            home.display()
        ),
        Ok(false) => {}
        Err(error) => eprintln!(
            "usemcpkit: cannot copy the saved credentials from {}: {error}",
            legacy_home.display()
        ),
    }
}
