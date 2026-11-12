use crate::consts::ROOT_SEGMENT;
use crate::naming::to_name_segment::to_name_segment;

/// The name of an endpoint no naming rule matches: its first literal path segment, the other literal segments joined
/// by `_`, and the method (`GET /repos/{owner}/{repo}/widgets/{id}` → `repos:widgets:get`).
pub fn fallback_name(method: &str, path: &str) -> String {
    let literals: Vec<String> = path
        .split('/')
        .filter(|segment| !segment.starts_with('{'))
        .map(to_name_segment)
        .filter(|segment| !segment.is_empty())
        .collect();
    let (group, rest) = match literals.split_first() {
        Some((group, rest)) => (group.clone(), rest),
        None => (ROOT_SEGMENT.to_owned(), &[][..]),
    };
    let resource = if rest.is_empty() { group.clone() } else { rest.join("_") };
    format!("{group}:{resource}:{}", method.to_ascii_lowercase())
}
