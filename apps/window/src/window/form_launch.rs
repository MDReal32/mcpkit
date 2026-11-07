use serde_json::Value;

/// What the page needs from the server that started the window: where its form API is, the token that proves the
/// page belongs to that server's open form, and the request it asks the user to answer.
#[derive(Debug, PartialEq)]
pub struct FormLaunch {
    pub api: String,
    pub session: String,
    pub request: Value,
}
