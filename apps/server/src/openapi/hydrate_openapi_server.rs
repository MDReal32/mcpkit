use crate::openapi::build_for_host::build_for_host;
use crate::openapi::cached_build::CachedBuild;
use crate::openapi::describe_version_fallback::describe_version_fallback;
use crate::openapi::is_build_current::is_build_current;
use crate::openapi::open_api_server::OpenApiServer;
use crate::openapi::read_cached_build::read_cached_build;
use crate::openapi::resolve_openapi_dir::resolve_openapi_dir;
use std::collections::HashSet;
use std::time::SystemTime;
use usemcpkit_auth::domain::resolve_domain;
use usemcpkit_execution::CallContext;
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_openapi::merge::merge_tools;
use usemcpkit_registry::{Fetch, RegistryContext, load_server_manifest};

/// The OpenAPI server behind a catalog entry with the tools of the version its host runs. Without `build`, only tools
/// built earlier are read and `None` means there are none; with it, they are built when missing, when the manifest
/// changed or when the version was asked a day ago or longer, signing in to the server first. Tools named like one of
/// `reserved` (its MCP server's) are left out.
pub async fn hydrate_openapi_server<F: Fetch>(
    server: &RegistryServer,
    context: &RegistryContext<F>,
    calls: &CallContext,
    reserved: &HashSet<String>,
    build: bool,
) -> Result<Option<OpenApiServer>, String> {
    let hydrated = async {
        let manifest = load_server_manifest(server, context)
            .await
            .map_err(|error| error.to_string())?;
        let Some(spec) = manifest.openapi.clone() else {
            return Err("the manifest has no OpenAPI sources".to_owned());
        };
        let dir = resolve_openapi_dir(&context.dir, &server.id);
        let domain = resolve_domain(&manifest, &calls.auth).await.map_err(|error| error.0)?;
        let cached = match (&manifest.domain, &domain) {
            (Some(_), None) => None,
            _ => read_cached_build(&dir, domain.as_deref()).await?,
        };
        let mut warnings = Vec::new();
        let CachedBuild { record, built } = match cached {
            Some(cached) if !build || is_build_current(&cached, server, SystemTime::now()) => cached,
            cached if build => match build_for_host(server, &manifest, &spec, domain, &dir, context, calls).await {
                Ok(fresh) => fresh,
                Err(error) => {
                    let Some(cached) = cached else {
                        return Err(error);
                    };
                    warnings.push(format!("{}: {error}; the tools built earlier are used", server.id));
                    cached
                }
            },
            _ => return Ok(None),
        };
        warnings.extend(describe_version_fallback(&server.id, &record));
        let tools = merge_tools(
            built.tools,
            &manifest.tools,
            reserved,
            &record.source,
            record.version.as_deref(),
        );
        Ok(Some(OpenApiServer {
            manifest: Manifest { tools, ..manifest },
            warnings,
        }))
    };
    hydrated
        .await
        .map_err(|error| format!("{} is unavailable: {error}", server.id))
}
