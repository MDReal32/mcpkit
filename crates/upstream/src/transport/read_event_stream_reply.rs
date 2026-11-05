use crate::upstream_error::UpstreamError;
use serde_json::Value;

/// The JSON-RPC reply to `id` inside a text/event-stream body; other events (notifications, requests) are skipped.
pub fn read_event_stream_reply(body: &str, id: u64) -> Result<Value, UpstreamError> {
    let body = body.replace("\r\n", "\n");
    for event in body.split("\n\n") {
        let data = event
            .split('\n')
            .filter_map(|line| line.strip_prefix("data:"))
            .map(str::trim_start)
            .collect::<Vec<_>>()
            .join("\n");
        if data.is_empty() {
            continue;
        }
        let Ok(message) = serde_json::from_str::<Value>(&data) else {
            continue;
        };
        if message.get("id").and_then(Value::as_u64) == Some(id) {
            return Ok(message);
        }
    }
    Err(UpstreamError::new("the event stream ended without a reply"))
}

#[cfg(test)]
mod tests {
    use super::read_event_stream_reply;
    use serde_json::json;

    #[test]
    fn skips_other_events_and_joins_multi_line_data() {
        let body = "event: message\r\ndata: {\"method\":\"notifications/progress\"}\r\n\r\ndata: not json\n\n\
                    data: {\"jsonrpc\":\"2.0\",\ndata: \"id\":2,\"result\":{}}\n\n";

        assert_eq!(
            read_event_stream_reply(body, 2),
            Ok(json!({ "jsonrpc": "2.0", "id": 2, "result": {} }))
        );
        assert!(read_event_stream_reply(body, 3).is_err());
    }
}
