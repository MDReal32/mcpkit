use serde_json::Value;

pub fn replace_line_id(line: &str, id: &str) -> Result<String, String> {
    let Ok(Value::Object(mut data)) = serde_json::from_str::<Value>(line) else {
        return Err("cannot replay a handshake line that is not a JSON object".into());
    };
    data.insert("id".into(), Value::String(id.into()));
    Ok(Value::Object(data).to_string())
}

#[cfg(test)]
mod tests {
    use super::replace_line_id;

    #[test]
    fn keeps_the_id_in_place() {
        assert_eq!(
            replace_line_id(r#"{"jsonrpc":"2.0","id":0,"method":"initialize"}"#, "x").unwrap(),
            r#"{"jsonrpc":"2.0","id":"x","method":"initialize"}"#
        );
        assert!(replace_line_id("[]", "x").is_err());
    }
}
