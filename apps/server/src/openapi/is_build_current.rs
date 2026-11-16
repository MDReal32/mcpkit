use crate::openapi::cached_build::CachedBuild;
use crate::openapi::is_check_due::is_check_due;
use std::time::SystemTime;
use usemcpkit_manifest::registry::RegistryServer;

/// Whether cached tools are used without asking the server: built with the manifest the index lists now, and with
/// versions asked less than a day ago.
pub fn is_build_current(cached: &CachedBuild, server: &RegistryServer, now: SystemTime) -> bool {
    cached.built.iter().all(|built| built.manifest_sha256 == server.sha256)
        && !is_check_due(&cached.record.checked_at, now)
}
