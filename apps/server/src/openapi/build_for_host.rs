use crate::openapi::build_spec_tools::build_spec_tools;
use crate::openapi::cached_build::CachedBuild;
use crate::openapi::choose_spec::choose_spec;
use crate::openapi::host_record::HostRecord;
use crate::openapi::probe_answer::ProbeAnswer;
use crate::openapi::probe_server::probe_server;
use crate::openapi::read_probed_version::read_probed_version;
use crate::openapi::read_version_override::read_version_override;
use crate::openapi::save_host_record::save_host_record;
use crate::openapi::source_record::SourceRecord;
use crate::openapi::to_probe_request::to_probe_request;
use std::path::Path;
use std::time::SystemTime;
use usemcpkit_execution::CallContext;
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::openapi::OpenApiSpec;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::{Fetch, RegistryContext};

/// Finds the host's sources and their versions and builds their tools. The server is asked for a version, signing in
/// as a tool call does, unless the source has no versions or its env var sets one; sources asking the same path share
/// the answer. With no host known yet, the sign-in asks for one.
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
    let all: Vec<_> = spec.sources.iter().collect();
    let mut answers: Vec<(String, ProbeAnswer)> = Vec::new();
    let domain = if manifest.domain.is_some() && domain.is_none() {
        let answer = probe_server(manifest, &all, calls).await?;
        let domain = answer.domain.clone();
        if let Some(primary) = spec.primary_source(domain.as_deref()) {
            answers.push((to_probe_request(primary).path, answer));
        }
        domain
    } else {
        domain
    };
    let sources = spec.sources_for(domain.as_deref());
    if sources.is_empty() {
        return Err(match &domain {
            Some(domain) => format!("no OpenAPI source matches the host {domain}"),
            None => "no OpenAPI source matches a server without a host".to_owned(),
        });
    }
    let mut records = Vec::with_capacity(sources.len());
    let mut built = Vec::with_capacity(sources.len());
    for source in sources {
        let version = match (&source.version, read_version_override(source, env)) {
            (None, _) => None,
            (Some(_), Some(version)) => Some(version),
            (Some(versioning), None) => {
                let path = &versioning.probe.path;
                if !answers.iter().any(|(asked, _)| asked == path) {
                    let answer = probe_server(manifest, &[source], calls).await?;
                    answers.push((path.clone(), answer));
                }
                let answer = answers
                    .iter()
                    .find(|(asked, _)| asked == path)
                    .map(|(_, answer)| answer);
                Some(read_probed_version(answer, versioning)?)
            }
        };
        let choice = choose_spec(source, version.as_deref(), context).await?;
        built.push(build_spec_tools(server, source, &choice, dir, &context.fetcher).await?);
        records.push(SourceRecord {
            source: source.name.clone(),
            version,
            spec_version: choice.spec_version,
        });
    }
    let record = HostRecord {
        sources: records,
        checked_at: humantime::format_rfc3339_millis(SystemTime::now()).to_string(),
    };
    save_host_record(dir, domain.as_deref(), &record).await?;
    Ok(CachedBuild { record, built })
}
