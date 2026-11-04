/// The page posts the answer here.
pub const CREDENTIALS_FORM_SUBMIT_PATH: &str = "/api/submit";

/// The page posts here when the user closes the form without an answer.
pub const CREDENTIALS_FORM_CANCEL_PATH: &str = "/api/cancel";

/// The page posts here to have the server fetch a token from a provider's CLI.
pub const CREDENTIALS_FORM_IMPORT_PATH: &str = "/api/import";

/// Carries the session token from the page URL's fragment on every API call.
pub const CREDENTIALS_FORM_SESSION_HEADER: &str = "X-Usemcpkit-Session";

/// The id of the empty JSON script element the request is injected into.
pub const CREDENTIALS_REQUEST_ELEMENT_ID: &str = "usemcpkit-request";
