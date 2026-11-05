use std::rc::Rc;

/// Receives the URL the user must open to approve access.
pub type AuthorizationUrlHandler = Rc<dyn Fn(&str)>;
