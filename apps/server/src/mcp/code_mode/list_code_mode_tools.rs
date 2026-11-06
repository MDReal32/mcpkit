use crate::mcp::ToolAnnotations;
use crate::mcp::code_mode::consts::{
    CODE_ARGUMENT, CODE_ARGUMENT_DESCRIPTION, EXECUTE_API, EXECUTE_EXAMPLE, EXECUTE_INTRO, EXECUTE_TOOL, SANDBOX_NOTE,
    SEARCH_TOOL,
};
use crate::mcp::code_mode::describe_search_tool::describe_search_tool;
use serde_json::{Value, json};
use usemcpkit_manifest::registry::RegistryServer;

/// The whole tool list: `search`, which only reads, and `execute`, which may change things.
pub fn list_code_mode_tools(servers: &[RegistryServer]) -> Value {
    let input_schema = json!({
        "type": "object",
        "properties": { CODE_ARGUMENT: { "type": "string", "description": CODE_ARGUMENT_DESCRIPTION } },
        "required": [CODE_ARGUMENT],
    });
    json!({
        "tools": [
            {
                "name": SEARCH_TOOL,
                "description": describe_search_tool(servers),
                "inputSchema": input_schema,
                "annotations": ToolAnnotations::READ_ONLY,
            },
            {
                "name": EXECUTE_TOOL,
                "description": format!("{EXECUTE_INTRO} {SANDBOX_NOTE}\n\n{EXECUTE_API}\n\n{EXECUTE_EXAMPLE}"),
                "inputSchema": input_schema,
                "annotations": ToolAnnotations::WRITES,
            },
        ]
    })
}
