use crate::repo::repo_state::RepoState;

/// A marker written before states existed held the repo spec alone: it is kept as the signature, never checked.
pub fn parse_repo_state(text: &str) -> RepoState {
    serde_json::from_str(text).unwrap_or_else(|_| RepoState {
        signature: text.to_owned(),
        commit: None,
        updated_at: 0,
        checked_at: 0,
    })
}

#[cfg(test)]
mod tests {
    use super::parse_repo_state;

    #[test]
    fn reads_a_state_and_keeps_an_older_marker_as_its_signature() {
        let state = parse_repo_state(r#"{"signature":"s","commit":"c","updatedAt":1000,"checkedAt":2000}"#);
        let legacy = parse_repo_state(r#"{"url":"u","ref":"main"}"#);

        assert_eq!((state.signature.as_str(), state.commit.as_deref()), ("s", Some("c")));
        assert_eq!((state.updated_at, state.checked_at), (1000, 2000));
        assert_eq!(legacy.signature, r#"{"url":"u","ref":"main"}"#);
        assert_eq!((legacy.commit, legacy.checked_at), (None, 0));
    }
}
