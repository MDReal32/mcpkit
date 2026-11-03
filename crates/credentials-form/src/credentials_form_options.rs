use mcpkit_core::env::Env;
use std::rc::Rc;
use std::time::Duration;

/// How the credentials form is shown: the page, who announces its URL, how long it waits, and the variables its CLI
/// buttons are looked up with.
#[derive(Clone)]
pub struct CredentialsFormOptions {
    /// The built `packages/ui` page with its empty request element.
    pub page: Rc<str>,
    pub on_url: Rc<dyn Fn(&str)>,
    pub timeout: Duration,
    pub env: Env,
}
