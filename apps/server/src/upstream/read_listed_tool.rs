use crate::upstream::discovered_tool::DiscoveredTool;
use serde_json::Value;

/// One tool of a `tools/list` page, named after itself until the naming rules rename it.
pub fn read_listed_tool(tool: Value) -> Result<DiscoveredTool, String> {
    let Value::Object(mut tool) = tool else {
        return Err("the upstream listed a tool that is not an object".to_owned());
    };
    let Some(Value::String(name)) = tool.remove("name") else {
        return Err("the upstream listed a tool without a name".to_owned());
    };
    let description = match tool.remove("description") {
        Some(Value::String(description)) => Some(description),
        _ => None,
    };
    let input_schema = match tool.remove("inputSchema") {
        Some(Value::Object(schema)) => Some(schema),
        _ => None,
    };
    Ok(DiscoveredTool {
        name: name.clone(),
        upstream_name: name,
        description,
        input_schema,
    })
}
