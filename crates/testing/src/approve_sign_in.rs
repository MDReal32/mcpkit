use std::io::{Read, Write};
use std::net::TcpStream;
use std::thread::{self, JoinHandle};
use url::Url;

/// Plays the browser that approves a sign-in: requests the authorization URL's redirect URI with `code-1` and the
/// given state, or the URL's own, from another thread. The handle yields the callback's status line.
pub fn approve_sign_in(authorization_url: &str, state: Option<&str>) -> JoinHandle<String> {
    let url = Url::parse(authorization_url).expect("the authorization URL is valid");
    let param = |name: &str| {
        url.query_pairs()
            .find(|(key, _)| key == name)
            .map(|(_, value)| value.into_owned())
            .unwrap_or_else(|| panic!("the authorization URL has no {name}"))
    };
    let redirect_uri = Url::parse(&param("redirect_uri")).expect("the redirect URI is valid");
    let state = state.map_or_else(|| param("state"), str::to_owned);
    thread::spawn(move || {
        let address = format!(
            "{}:{}",
            redirect_uri.host_str().expect("the redirect URI has a host"),
            redirect_uri.port().expect("the redirect URI has a port")
        );
        let mut stream = TcpStream::connect(&address).expect("the callback server accepts connections");
        let request = format!(
            "GET {}?code=code-1&state={state} HTTP/1.1\r\nHost: {address}\r\nConnection: close\r\n\r\n",
            redirect_uri.path()
        );
        stream
            .write_all(request.as_bytes())
            .expect("the callback request is sent");
        let mut response = String::new();
        stream.read_to_string(&mut response).expect("the callback answers");
        response.lines().next().unwrap_or_default().to_owned()
    })
}
