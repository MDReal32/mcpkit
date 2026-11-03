use base64::Engine;
use base64::engine::general_purpose::STANDARD;

pub fn encode_basic_credentials(username: &str, password: &str) -> String {
    format!("Basic {}", STANDARD.encode(format!("{username}:{password}")))
}
