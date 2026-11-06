use usemcpkit_core::mcp::PARTIAL_LOADING_ENABLED;

/// How the tool list is built: every tool from the start, or one section per server opened on demand.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ToolLoading {
    /// Every tool the server can load without starting anything is listed from the first `tools/list`.
    Full,
    /// One section per server; calling it loads its groups or tools and sends `tools/list_changed`.
    Partial,
}

impl ToolLoading {
    /// From the value of `USEMCPKIT_BETA_PARTIAL_LOADING`: only `1` turns partial loading on.
    pub fn from_env_value(value: Option<&str>) -> Self {
        if value == Some(PARTIAL_LOADING_ENABLED) {
            ToolLoading::Partial
        } else {
            ToolLoading::Full
        }
    }
}
