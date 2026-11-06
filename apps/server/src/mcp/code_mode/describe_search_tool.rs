use crate::mcp::code_mode::consts::{SANDBOX_NOTE, SEARCH_API, SEARCH_EXAMPLE, SEARCH_INTRO, SERVERS_HEADING};
use usemcpkit_manifest::registry::RegistryServer;

/// The search tool's description, ending with the servers it serves so the model knows the ids to start from.
pub fn describe_search_tool(servers: &[RegistryServer]) -> String {
    let listed: Vec<String> = servers
        .iter()
        .map(|server| match &server.description {
            Some(description) => format!("- {}: {description}", server.id),
            None => format!("- {}", server.id),
        })
        .collect();
    format!(
        "{SEARCH_INTRO} {SANDBOX_NOTE}\n\n{SEARCH_API}\n\n{SEARCH_EXAMPLE}\n\n{SERVERS_HEADING}\n{}",
        listed.join("\n")
    )
}
