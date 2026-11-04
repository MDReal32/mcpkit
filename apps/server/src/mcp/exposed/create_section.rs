use crate::mcp::exposed::create_group_section_description::create_group_section_description;
use crate::mcp::exposed::create_server_section_description::create_server_section_description;
use crate::mcp::exposed::exposed_section::ExposedSection;
use crate::mcp::exposed::pick_free_name::pick_free_name;
use std::collections::HashSet;
use usemcpkit_manifest::registry::RegistryServer;

pub fn create_section(server: &RegistryServer, group: Option<&str>, taken: &mut HashSet<String>) -> ExposedSection {
    let description = match group {
        Some(group) => create_group_section_description(server, group),
        None => create_server_section_description(server),
    };
    ExposedSection {
        name: pick_free_name(&server.id, group.unwrap_or_default(), taken),
        server_id: server.id.clone(),
        group: group.map(str::to_owned),
        description,
    }
}
