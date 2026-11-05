use crate::upstream::discover_tools::discover_tools;
use crate::upstream::rename_discovered_tools::rename_discovered_tools;
use crate::upstream::upstream_server::UpstreamServer;
use usemcpkit_execution::CallContext;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_manifest::upstream::UpstreamSpec;
use usemcpkit_registry::{Fetch, RegistryContext, load_manifest};

/// The upstream server behind a catalog entry, with its tools discovered: from the cache when there is one, otherwise
/// by starting it (which clones and sets up its repository the first time). Called when the server is first opened,
/// never at start, so a server nobody uses costs nothing.
pub async fn hydrate_upstream_server<F: Fetch>(
    server: &RegistryServer,
    context: &RegistryContext<F>,
    calls: &CallContext,
) -> Result<UpstreamServer, String> {
    let hydrated = async {
        let manifest = load_manifest(server, context, "")
            .await
            .map_err(|error| error.to_string())?;
        let tools = discover_tools(&context.dir, &server.id, &manifest, calls).await?;
        let tools = rename_discovered_tools(tools, manifest.upstream.as_ref().and_then(UpstreamSpec::naming))?;
        Ok::<_, String>(UpstreamServer::new(manifest, tools, calls.clone()))
    };
    hydrated
        .await
        .map_err(|error| format!("{} is unavailable: {error}", server.id))
}
