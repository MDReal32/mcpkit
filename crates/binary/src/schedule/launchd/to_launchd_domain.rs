/// The per-user GUI domain a LaunchAgent is bootstrapped into.
pub fn to_launchd_domain() -> String {
    #[cfg(unix)]
    let uid = rustix::process::getuid().as_raw();
    #[cfg(not(unix))]
    let uid = 0;
    format!("gui/{uid}")
}
