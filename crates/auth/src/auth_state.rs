use crate::credentials::PendingCredentialExchange;
use crate::oauth::{PendingSignIn, PendingToken};
use std::cell::RefCell;
use std::collections::HashMap;

/// What the calls of one server process share: one refresh per server at a time, since refresh tokens can rotate, one
/// browser sign-in per server and auth entry, and one credentials form per server.
#[derive(Default)]
pub struct AuthState {
    pub(crate) pending_credential_requests: RefCell<HashMap<String, PendingCredentialExchange>>,
    pub(crate) pending_refreshes: RefCell<HashMap<String, PendingToken>>,
    pub(crate) pending_sign_ins: RefCell<HashMap<String, PendingSignIn>>,
}
