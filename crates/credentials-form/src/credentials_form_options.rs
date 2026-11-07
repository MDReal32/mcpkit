use crate::form_url_announcer::FormUrlAnnouncer;
use std::rc::Rc;
use std::time::Duration;
use usemcpkit_core::env::Env;

/// How the credentials form is shown: the page, who announces its URL with the request the form asks, how long it waits, and the variables its CLI
/// buttons are looked up with.
#[derive(Clone)]
pub struct CredentialsFormOptions {
    /// The built `apps/window/ui` page with its empty request element.
    pub page: Rc<str>,
    pub on_url: FormUrlAnnouncer,
    pub timeout: Duration,
    pub env: Env,
}
