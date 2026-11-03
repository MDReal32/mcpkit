use mcpkit_core::env::Env;
use std::rc::Rc;

#[derive(Clone)]
pub struct RepoOptions {
    /// When false a clone is never compared with its remote once it is built.
    pub check: bool,
    pub warn: Rc<dyn Fn(&str)>,
    /// Epoch milliseconds.
    pub now: Rc<dyn Fn() -> u64>,
    /// mcpkit's own environment, of which git and the setup steps get only the forwarded variables.
    pub env: Env,
}
