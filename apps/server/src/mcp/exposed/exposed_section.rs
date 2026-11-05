use crate::mcp::consts::TOOL_ID_SEPARATOR;

/// A server or one of its groups, listed like a tool so the model can open it: calling it takes no arguments, lists
/// what is inside and puts the tools of a group into the tool list. It is not a tool of the server itself.
#[derive(Clone, Debug, PartialEq)]
pub struct ExposedSection {
    pub name: String,
    pub server_id: String,
    /// Set for a group of a server split into parts; unset for the server itself.
    pub group: Option<String>,
    pub description: String,
}

impl ExposedSection {
    /// `git:github` for a server, `git:github:repos` for one of its groups; also the id the opened text names.
    pub fn key(&self) -> String {
        match &self.group {
            Some(group) => format!("{}{TOOL_ID_SEPARATOR}{group}", self.server_id),
            None => self.server_id.clone(),
        }
    }
}
