use crate::openapi::consts::PROBE_TOOL_NAME;
use crate::openapi::to_probe_request::to_probe_request;
use indexmap::IndexMap;
use serde_json::Map;
use usemcpkit_manifest::openapi::OpenApiSource;
use usemcpkit_manifest::tool::{ToolEdition, ToolSpec};
use usemcpkit_manifest::{EditionSpec, Manifest};

/// The manifest with one tool, the probe: each source with hosts is an edition, the ones with versions first, so the
/// host the credentials form picks sends the probe of the primary source of that host (see
/// [`usemcpkit_manifest::openapi::OpenApiSpec::primary_source`]); any other host sends the one of the sources without
/// hosts.
pub fn build_probe_manifest(manifest: &Manifest, sources: &[&OpenApiSource]) -> Result<Manifest, String> {
    let hostless: Vec<&OpenApiSource> = sources
        .iter()
        .copied()
        .filter(|source| source.hosts.is_none())
        .collect();
    let Some(fallback) = hostless
        .iter()
        .find(|source| source.version.is_some())
        .or_else(|| hostless.first())
        .or_else(|| sources.first())
    else {
        return Err("the manifest lists no OpenAPI sources".to_owned());
    };
    let (versioned, unversioned): (Vec<&OpenApiSource>, Vec<&OpenApiSource>) = sources
        .iter()
        .copied()
        .filter(|source| source.hosts.is_some())
        .partition(|source| source.version.is_some());
    let hosted: Vec<&OpenApiSource> = versioned.into_iter().chain(unversioned).collect();
    let editions: IndexMap<String, EditionSpec> = hosted
        .iter()
        .map(|source| {
            let edition = EditionSpec {
                label: None,
                hosts: source.hosts.clone().unwrap_or_default(),
            };
            (source.name.clone(), edition)
        })
        .collect();
    let tool_editions: IndexMap<String, ToolEdition> = hosted
        .iter()
        .map(|source| {
            let edition = ToolEdition {
                request: to_probe_request(source),
                response: None,
            };
            (source.name.clone(), edition)
        })
        .collect();
    let probe = ToolSpec {
        name: PROBE_TOOL_NAME.to_owned(),
        description: String::new(),
        input: Map::new(),
        request: to_probe_request(fallback),
        response: None,
        editions: Some(tool_editions).filter(|editions| !editions.is_empty()),
        applies: None,
    };
    Ok(Manifest {
        editions: Some(editions).filter(|editions| !editions.is_empty()),
        tools: vec![probe],
        ..manifest.clone()
    })
}
