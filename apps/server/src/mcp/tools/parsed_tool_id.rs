/// `git:github:pull_request:list` as server id `git:github` and tool `pull_request:list`.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ParsedToolId {
    pub server_id: String,
    pub tool: String,
}
