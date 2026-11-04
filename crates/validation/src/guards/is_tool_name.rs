use crate::guards::is_server_name::is_server_name;

/// `^[a-z][a-z0-9_]*(:[a-z][a-z0-9_]*)*$`, for example `pull_request:list`.
pub fn is_tool_name(text: &str) -> bool {
    text.split(':').all(is_server_name)
}
