use crate::catalog::RegistryCatalog;
use crate::mcp::tools::find_tool::find_tool;
use crate::mcp::tools::tool_outcome::ToolOutcome;
use serde_json::{Map, Value};
use usemcpkit_execution::{CallContext, execute_tool};
use usemcpkit_registry::Fetch;

/// Runs the tool `id` names; the error text is written for the model to read. A tool of the manifest itself runs
/// first and never starts its upstream; any other tool of a server with an upstream is the upstream's.
pub async fn run_server_tool<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    id: &str,
    args: Option<&Map<String, Value>>,
    context: &CallContext,
) -> Result<ToolOutcome, String> {
    let found = find_tool(catalog, id)?;
    if let Some((manifest, tool)) = catalog.load_own_tool(&found.server_id, &found.tool).await? {
        return execute_tool(&manifest, &tool, args, context)
            .await
            .map(ToolOutcome::Json)
            .map_err(|error| error.0);
    }
    let Some(upstream) = catalog.load_upstream(&found.server_id).await? else {
        return Err(format!("\"{id}\" is not in the manifest of {}", found.server_id));
    };
    let Some(discovered) = upstream.tools.get(&found.tool) else {
        return Err(format!("\"{id}\" is not on {}", found.server_id));
    };
    upstream
        .call(discovered, args)
        .await
        .map(ToolOutcome::Mcp)
        .map_err(|error| error.message().to_owned())
}
