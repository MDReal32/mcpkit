use crate::mcp::exposed::consts::SECTION_NOTICE;
use mcpkit_manifest::registry::RegistryServer;

pub fn create_group_section_description(server: &RegistryServer, group: &str) -> String {
    format!(
        "Group \"{group}\" of {}. {SECTION_NOTICE} Call it with no arguments to load its tools into the tool list.",
        server.id
    )
}
