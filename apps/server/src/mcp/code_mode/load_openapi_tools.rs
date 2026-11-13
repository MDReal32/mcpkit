use crate::catalog::RegistryCatalog;
use crate::mcp::code_mode::describe_tools::describe_tools;
use crate::mcp::code_mode::describe_unbuilt_server::describe_unbuilt_server;
use crate::mcp::code_mode::filter_by_group::filter_by_group;
use crate::mcp::code_mode::listed::Listed;
use crate::mcp::code_mode::tool_descriptor::ToolDescriptor;
use crate::mcp::code_mode::upstream_listing::UpstreamListing;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::Fetch;

/// The tools an OpenAPI server has for its host, of one group or all of them. A listing that may start things builds
/// them; one that may not lists the ones built earlier, or none with a note saying how to build them.
pub async fn load_openapi_tools<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    server: &RegistryServer,
    group: Option<&str>,
    listing: UpstreamListing,
) -> Result<Listed<ToolDescriptor>, String> {
    let build = listing == UpstreamListing::Start;
    let Some(openapi) = catalog.load_openapi(&server.id, build).await? else {
        return Ok(Listed::with_warning(Vec::new(), describe_unbuilt_server(&server.id)));
    };
    let tools = filter_by_group(describe_tools(openapi.manifest.tools.clone()), group);
    Ok(Listed {
        items: tools,
        warnings: openapi.warnings.clone(),
    })
}
