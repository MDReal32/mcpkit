//! The Rust port of `@usemcpkit/credentials-form`: the one-off loopback page a call opens when it needs credentials or
//! a domain, and the token import that runs a provider's CLI for it.

mod cli_detection;
mod consts;
mod create_credentials_form;
mod credentials_form_options;
mod form_url_announcer;
mod host_check;
mod inject_credential_request;
mod server;
mod submit_answer;
mod token_import;

pub use consts::CREDENTIALS_FORM_TIMEOUT;
pub use create_credentials_form::create_credentials_form;
pub use credentials_form_options::CredentialsFormOptions;
pub use form_url_announcer::FormUrlAnnouncer;
