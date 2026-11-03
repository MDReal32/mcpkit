use crate::oauth::{PendingSignIn, PendingToken};
use std::cell::RefCell;
use std::collections::HashMap;

/// What the calls of one server process share: one refresh per server at a time, since refresh tokens can rotate, and
/// one browser sign-in per server and auth entry.
#[derive(Default)]
pub struct AuthState {
    pub(crate) pending_refreshes: RefCell<HashMap<String, PendingToken>>,
    pub(crate) pending_sign_ins: RefCell<HashMap<String, PendingSignIn>>,
}
