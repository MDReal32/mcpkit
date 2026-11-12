use crate::catalog::RegistryCatalog;
use crate::mcp::code_mode::listed::Listed;
use crate::mcp::code_mode::load_upstream_tools::load_upstream_tools;
use crate::mcp::code_mode::upstream_listing::UpstreamListing;
use crate::mcp::consts::TOOL_ID_SEPARATOR;
use crate::upstream::MIN_SEGMENTS_TO_GROUP;
use indexmap::IndexSet;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::Fetch;

/// The groups a server opens into: its parts for a server split into files, plus the first name segments of an
/// upstream whose tools are all named `<group>:<resource>:<action>`. Empty when its tools are not grouped. A failing
/// upstream leaves the groups of the manifest's own tools, with the failure as a warning.
pub async fn load_group_names<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    server: &RegistryServer,
    listing: UpstreamListing,
) -> Result<Listed<String>, String> {
    let own = catalog.load_groups(&server.id).await?;
    if !server.upstream {
        return Ok(Listed::new(own));
    }
    let has_own = !own.is_empty() || catalog.has_own_tools(&server.id).await?;
    if has_own && listing == UpstreamListing::CachedOnly && !catalog.has_cached_upstream_tools(&server.id).await? {
        return Ok(Listed::new(own));
    }
    let tools = match load_upstream_tools(catalog, server).await {
        Ok(tools) => tools,
        Err(error) if has_own => return Ok(Listed::with_warning(own, error)),
        Err(error) => return Err(error),
    };
    let grouped = !tools.is_empty()
        && tools
            .iter()
            .all(|found| found.tool.split(TOOL_ID_SEPARATOR).count() >= MIN_SEGMENTS_TO_GROUP);
    let own_tools_ungrouped = has_own && own.is_empty();
    if !grouped || own_tools_ungrouped {
        return Ok(Listed::new(own));
    }
    let mut groups: IndexSet<String> = own.into_iter().collect();
    groups.extend(tools.iter().map(|found| {
        found
            .tool
            .split(TOOL_ID_SEPARATOR)
            .next()
            .unwrap_or_default()
            .to_owned()
    }));
    Ok(Listed::new(groups.into_iter().collect()))
}
