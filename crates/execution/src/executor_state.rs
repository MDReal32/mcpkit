use std::cell::RefCell;
use std::collections::HashMap;

/// What the calls of one server process share.
#[derive(Debug, Default)]
pub struct ExecutorState {
    /// Per server: the provided auth that last worked, tried right after `tokens.json` so rejected entries are not
    /// re-sent.
    pub(crate) preferred_auth_labels: RefCell<HashMap<String, String>>,
}
