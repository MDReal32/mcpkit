use crate::auth_fallback::accepted_auth_attempt::AcceptedAuthAttempt;

#[derive(Clone, Debug, PartialEq)]
pub enum AuthAttempt {
    Accepted(Box<AcceptedAuthAttempt>),
    /// Why the candidate did not work, shown when no candidate does.
    Rejected(String),
}
