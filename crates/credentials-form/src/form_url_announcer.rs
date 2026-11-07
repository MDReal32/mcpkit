use std::rc::Rc;
use usemcpkit_auth::credentials::CredentialRequest;

/// Called with the URL of an opened form and the request it asks, so that the caller can show it in a window.
pub type FormUrlAnnouncer = Rc<dyn Fn(&str, &CredentialRequest)>;
