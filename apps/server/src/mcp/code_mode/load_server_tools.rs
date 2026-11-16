use crate::catalog::RegistryCatalog;
use crate::mcp::code_mode::filter_by_group::filter_by_group;
use crate::mcp::code_mode::listed::Listed;
use crate::mcp::code_mode::load_openapi_tools::load_openapi_tools;
use crate::mcp::code_mode::load_own_tools::load_own_tools;
use crate::mcp::code_mode::load_upstream_tools::load_upstream_tools;
use crate::mcp::code_mode::merge_upstream_tools::merge_upstream_tools;
use crate::mcp::code_mode::tool_descriptor::ToolDescriptor;
use crate::mcp::code_mode::upstream_listing::UpstreamListing;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::Fetch;

/// The tools of one group, or of the whole server: its manifest's own tools (for an OpenAPI server, the ones built for
/// its host) and, for a server with an upstream, the upstream's. When a manifest has tools of its own, a failing upstream does not take them away: they are listed
/// with the failure as a warning; for a manifest that only fronts an upstream the failure is the error.
pub async fn load_server_tools<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    server: &RegistryServer,
    group: Option<&str>,
    listing: UpstreamListing,
) -> Result<Listed<ToolDescriptor>, String> {
    let own = if server.openapi {
        load_openapi_tools(catalog, server, group, listing).await?
    } else {
        Listed::new(load_own_tools(catalog, server, group).await?)
    };
    if !server.upstream {
        return Ok(own);
    }
    let has_own = !own.items.is_empty() || catalog.has_own_tools(&server.id).await?;
    if has_own && listing == UpstreamListing::CachedOnly && !catalog.has_cached_upstream_tools(&server.id).await? {
        return Ok(own);
    }
    let Listed {
        items: own,
        warnings: mut own_warnings,
    } = own;
    let mut merged = match load_upstream_tools(catalog, server).await {
        Ok(upstream) => merge_upstream_tools(&server.id, own, filter_by_group(upstream, group)),
        Err(error) if has_own => Listed::with_warning(own, error),
        Err(error) => return Err(error),
    };
    own_warnings.append(&mut merged.warnings);
    merged.warnings = own_warnings;
    Ok(merged)
}
