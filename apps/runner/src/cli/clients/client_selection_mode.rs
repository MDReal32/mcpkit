#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ClientSelectionMode {
    Install,
    Uninstall,
}

impl ClientSelectionMode {
    pub fn message(self) -> &'static str {
        match self {
            ClientSelectionMode::Install => "Add mcpkit to which clients?",
            ClientSelectionMode::Uninstall => "Remove mcpkit from which clients?",
        }
    }
}
