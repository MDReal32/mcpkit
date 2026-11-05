use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::registry::RegistryServer;

/// The file an index entry links to must be that server, so a wrong link can never stand in for another one.
pub fn check_identity(server: &RegistryServer, manifest: &Manifest) -> Result<(), String> {
    let id = manifest.id();
    if id == server.id {
        Ok(())
    } else {
        Err(format!("{}: the manifest is {id}", server.id))
    }
}
