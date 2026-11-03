use crate::auth_fallback::auth_candidate::AuthCandidate;
use crate::auth_fallback::auth_candidate_kind::AuthCandidateKind;

/// `tokens.json` always goes first so a fresh sign-in wins; the last working provided auth comes right after it.
pub fn order_auth_candidates<'a>(
    preferred_label: Option<&str>,
    candidates: Vec<AuthCandidate<'a>>,
) -> Vec<AuthCandidate<'a>> {
    let rank = |candidate: &AuthCandidate| match candidate.kind {
        AuthCandidateKind::Stored => 0,
        AuthCandidateKind::Provided if Some(candidate.label.as_str()) == preferred_label => 1,
        _ => 2,
    };
    let mut ordered = candidates;
    ordered.sort_by_key(rank);
    ordered
}
