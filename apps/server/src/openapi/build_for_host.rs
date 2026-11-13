use crate::openapi::build_spec_tools::build_spec_tools;
use crate::openapi::cached_build::CachedBuild;
use crate::openapi::choose_spec::choose_spec;
use crate::openapi::find_source::find_source;
use crate::openapi::host_record::HostRecord;
use crate::openapi::probe_server::probe_server;
use crate::openapi::read_probed_version::read_probed_version;
use crate::openapi::read_version_override::read_version_override;
use crate::openapi::save_host_record::save_host_record;
use std::path::Path;
use std::time::SystemTime;
use usemcpkit_execution::CallContext;
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::openapi::OpenApiSpec;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::{Fetch, RegistryContext};

/// Finds the host's source and version and builds its tools. The server is asked for its version, signing in as a tool
/// call does, unless the source has no versions or its env var sets one; with no host known yet, the sign-in asks for
/// one.
pub async fn build_for_host<F: Fetch>(
    server: &RegistryServer,
    manifest: &Manifest,
    spec: &OpenApiSpec,
    domain: Option<String>,
    dir: &Path,
    context: &RegistryContext<F>,
    calls: &CallContext,
) -> Result<CachedBuild, String> {
    let env = &calls.auth.env;
    let undecided = manifest.domain.is_some() && domain.is_none();
    let needs_probe = undecided || {
        let source = find_source(&spec.sources, domain.as_deref())?;
        source.version.is_some() && read_version_override(source, env).is_none()
    };
    let answer = if needs_probe {
        Some(probe_server(manifest, &spec.sources, calls).await?)
    } else {
        None
    };
    let domain = match &answer {
        Some(answer) if undecided => answer.domain.clone(),
        _ => domain,
    };
    let source = find_source(&spec.sources, domain.as_deref())?;
    let version = match (&source.version, read_version_override(source, env)) {
        (None, _) => None,
        (Some(_), Some(version)) => Some(version),
        (Some(versioning), None) => Some(read_probed_version(answer.as_ref(), versioning)?),
    };
    let choice = choose_spec(source, version.as_deref(), context).await?;
    let built = build_spec_tools(server, source, &spec.naming, &choice, dir, &context.fetcher).await?;
    let record = HostRecord {
        source: source.name.clone(),
        version,
        spec_version: choice.spec_version,
        checked_at: humantime::format_rfc3339_millis(SystemTime::now()).to_string(),
    };
    save_host_record(dir, domain.as_deref(), &record).await?;
    Ok(CachedBuild { record, built })
}
