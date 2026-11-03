use mcpkit_manifest::upstream::UpstreamRepo;

/// A full commit id (40 or 64 lowercase hex digits) never moves, so there is nothing to compare with the remote.
pub fn is_pinned_commit(repo: &UpstreamRepo) -> bool {
    let reference = &repo.reference;
    matches!(reference.len(), 40 | 64) && reference.bytes().all(|byte| matches!(byte, b'0'..=b'9' | b'a'..=b'f'))
}
