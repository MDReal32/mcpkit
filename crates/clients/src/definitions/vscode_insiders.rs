use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_stdio_entry::create_stdio_entry;
use crate::definitions::resolve_vscode_user_dir::resolve_vscode_user_dir;

pub const VSCODE_INSIDERS: ClientDefinition = ClientDefinition {
    id: "vscode-insiders",
    name: "VS Code Insiders",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![resolve_vscode_user_dir(context, "Code - Insiders")],
    config_path: |context| resolve_vscode_user_dir(context, "Code - Insiders").join("mcp.json"),
    servers_path: &["servers"],
    create_entry: create_stdio_entry,
    settings: &[],
};
