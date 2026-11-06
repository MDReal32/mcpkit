use crate::catalog::RegistryCatalog;
use crate::mcp::exposed::exposed_section::ExposedSection;
use crate::mcp::exposed::fetched_section::FetchedSection;
use crate::mcp::exposed::load_group_names::load_group_names;
use crate::mcp::exposed::load_group_tools::load_group_tools;
use usemcpkit_registry::Fetch;

/// Downloads (or reads from the cache) what is inside `section`: the groups of a split server, else its tools.
pub async fn fetch_section<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    section: &ExposedSection,
) -> Result<FetchedSection, String> {
    let server = catalog.find_server(&section.server_id)?;
    if section.group.is_none() {
        let groups = load_group_names(catalog, server).await?;
        if !groups.is_empty() {
            return Ok(FetchedSection::Groups(groups));
        }
    }
    let tools = load_group_tools(catalog, server, section.group.as_deref()).await?;
    Ok(FetchedSection::Tools(tools))
}
