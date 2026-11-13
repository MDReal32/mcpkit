use crate::guards::consts::HTTP_METHODS;

/// The name of a tool built from an OpenAPI endpoint, `<path>:<method>` (`repos/{owner}/{repo}/branches:get`): a path
/// without spaces that does not start with `/` unless it is the root, and a lowercase method.
pub fn is_endpoint_tool_name(text: &str) -> bool {
    let Some((path, method)) = text.rsplit_once(':') else {
        return false;
    };
    let method_ok = HTTP_METHODS.iter().any(|known| known.to_ascii_lowercase() == method);
    let path_ok = !path.is_empty() && (path == "/" || !path.starts_with('/')) && !path.chars().any(char::is_whitespace);
    method_ok && path_ok
}
