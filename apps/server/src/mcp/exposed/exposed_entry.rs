use crate::mcp::annotations::ToolAnnotations;
use crate::mcp::exposed::exposed_section::ExposedSection;
use crate::mcp::exposed::exposed_tool::ExposedTool;
use serde_json::{Value, json};

#[derive(Clone, Debug, PartialEq)]
pub enum ExposedEntry {
    Section(ExposedSection),
    Tool(ExposedTool),
}

impl ExposedEntry {
    pub fn name(&self) -> &str {
        match self {
            ExposedEntry::Section(section) => &section.name,
            ExposedEntry::Tool(tool) => &tool.name,
        }
    }

    /// The entry as `tools/list` hands it to the client. A section takes no arguments and only reads.
    pub fn to_listed(&self) -> Value {
        match self {
            ExposedEntry::Section(section) => json!({
                "name": section.name,
                "description": section.description,
                "inputSchema": { "type": "object", "properties": {} },
                "annotations": ToolAnnotations::READ_ONLY,
            }),
            ExposedEntry::Tool(tool) => {
                let mut listed = json!({
                    "name": tool.name,
                    "description": tool.description,
                    "inputSchema": tool.input_schema,
                });
                if let Some(annotations) = tool.annotations {
                    listed["annotations"] = json!(annotations);
                }
                listed
            }
        }
    }
}
