use crate::mcp::exposed::consts::SECTION_NOTICE;
use mcpkit_manifest::registry::RegistryServer;

pub fn create_server_section_description(server: &RegistryServer) -> String {
    let summary = server.description.as_deref().unwrap_or(&server.id);
    format!(
        "{summary}. {SECTION_NOTICE} Call it with no arguments to open it: it lists its groups (each one another \
         section) or, when it has none, loads its tools into the tool list."
    )
}
