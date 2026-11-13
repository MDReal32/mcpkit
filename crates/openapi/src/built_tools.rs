use usemcpkit_manifest::tool::ToolSpec;

#[derive(Clone, Debug, PartialEq)]
pub struct BuiltTools {
    pub tools: Vec<ToolSpec>,
    /// `METHOD /path: reason` for each endpoint that could not become a tool.
    pub skipped: Vec<String>,
}
