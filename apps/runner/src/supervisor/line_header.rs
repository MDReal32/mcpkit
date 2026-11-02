use serde_json::Value;

#[derive(Debug, Default, PartialEq)]
pub struct LineHeader {
    pub id: Option<Value>,
    pub method: Option<String>,
}

pub fn read_line_header(line: &str) -> LineHeader {
    let Ok(Value::Object(mut data)) = serde_json::from_str::<Value>(line) else {
        return LineHeader::default();
    };
    let method = match data.remove("method") {
        Some(Value::String(method)) => Some(method),
        _ => None,
    };
    LineHeader {
        id: data.remove("id"),
        method,
    }
}
