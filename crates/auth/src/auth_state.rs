use crate::oauth::PendingToken;
use std::cell::RefCell;
use std::collections::HashMap;

/// What the calls of one server process share: one refresh per server at a time, since refresh tokens can rotate.
#[derive(Default)]
pub struct AuthState {
    pub(crate) pending_refreshes: RefCell<HashMap<String, PendingToken>>,
}
