use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::upstream::UpstreamSpec;

/// The manifest with the `auth` of its HTTP upstream in place of its own, so the upstream signs in with what it needs
/// while the manifest's tools keep theirs; unchanged when the upstream has no `auth` of its own.
pub fn with_upstream_auth(manifest: &Manifest) -> Manifest {
    let Some(UpstreamSpec::Http(upstream)) = &manifest.upstream else {
        return manifest.clone();
    };
    let Some(auth) = &upstream.auth else {
        return manifest.clone();
    };
    Manifest {
        auth: Some(auth.clone()),
        ..manifest.clone()
    }
}
