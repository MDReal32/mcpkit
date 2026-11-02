use serde_json::Value;

pub fn read_server_version(initialize_response: &str) -> String {
    let data = serde_json::from_str::<Value>(initialize_response).unwrap_or(Value::Null);
    match data.pointer("/result/serverInfo/version") {
        Some(Value::String(version)) => version.clone(),
        _ => "unknown".into(),
    }
}

#[cfg(test)]
mod tests {
    use super::read_server_version;

    #[test]
    fn reads_the_server_info_version() {
        assert_eq!(
            read_server_version(r#"{"result":{"serverInfo":{"version":"1.2.3"}}}"#),
            "1.2.3"
        );
        assert_eq!(read_server_version(r#"{"result":{}}"#), "unknown");
        assert_eq!(read_server_version("oops"), "unknown");
    }
}
