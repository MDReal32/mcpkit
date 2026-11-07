use usemcpkit_core::browser::open_browser;

/// Prints the sign-in URL on stderr, which the client shows in its MCP log, and opens it in the browser.
pub fn announce_authorization_url(url: &str) {
    eprintln!("Sign-in required, open this URL to authorize:\n  {url}");
    open_browser(url);
}
