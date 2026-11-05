use crate::tool::ToolSpec;

/// The tool with the request, and the response mapping when it has one, of the named edition.
pub fn apply_tool_edition(tool: &ToolSpec, edition_name: Option<&str>) -> ToolSpec {
    let edition = edition_name.and_then(|name| tool.editions.as_ref()?.get(name));
    let Some(edition) = edition else {
        return tool.clone();
    };
    ToolSpec {
        request: edition.request.clone(),
        response: edition.response.clone().or_else(|| tool.response.clone()),
        ..tool.clone()
    }
}
