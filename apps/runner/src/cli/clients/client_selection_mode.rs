#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ClientSelectionMode {
    Install,
    Uninstall,
}

impl ClientSelectionMode {
    pub fn message(self) -> &'static str {
        match self {
            ClientSelectionMode::Install => "Add usemcpkit to which clients?",
            ClientSelectionMode::Uninstall => "Remove usemcpkit from which clients?",
        }
    }
}
