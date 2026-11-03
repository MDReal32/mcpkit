use crate::auth_fallback::auth_candidate_kind::AuthCandidateKind;
use crate::auth_fallback::candidate_resolver::CandidateResolver;

pub struct AuthCandidate<'a> {
    pub label: String,
    pub kind: AuthCandidateKind,
    pub resolve: CandidateResolver<'a>,
}
