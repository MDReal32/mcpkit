use mcpkit_clients::CLIENT_DEFINITIONS;

pub fn print_detected_clients_missing() {
    let supported: Vec<&str> = CLIENT_DEFINITIONS.iter().map(|definition| definition.name).collect();
    eprintln!(
        "no supported AI client found for this user. Supported: {}",
        supported.join(", ")
    );
}
