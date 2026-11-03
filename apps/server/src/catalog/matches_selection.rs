/// Ids are `category:name`; a bare `github` also selects `git:github`.
pub fn matches_selection(id: &str, selection: &str) -> bool {
    id == selection || id.ends_with(&format!(":{selection}"))
}
