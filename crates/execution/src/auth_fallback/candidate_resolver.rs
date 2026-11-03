use mcpkit_auth::{AuthError, AuthResolution};
use mcpkit_core::LocalFuture;

/// Reads a candidate's credentials when it is tried; an error only rules the candidate out.
pub type CandidateResolver<'a> = Box<dyn FnOnce() -> LocalFuture<'a, Result<AuthResolution, AuthError>> + 'a>;
