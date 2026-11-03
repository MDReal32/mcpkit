use crate::browser::open_form_window::open_form_window;

/// Prints the form URL on stderr, which the client shows in its MCP log, and opens it in the form window.
pub fn announce_credentials_form_url(url: &str) {
    eprintln!("Credentials required, open this URL to enter them:\n  {url}");
    open_form_window(url);
}
