use crate::consts::MAX_BODY_BYTES;
use http_body_util::{BodyExt, LengthLimitError, Limited};
use hyper::body::Incoming;
use serde_json::Value;

/// The request body as JSON, refused past `MAX_BODY_BYTES`; the error is what the page shows.
pub async fn read_json_body(body: Incoming) -> Result<Value, String> {
    let collected = Limited::new(body, MAX_BODY_BYTES).collect().await.map_err(|error| {
        match error.downcast_ref::<LengthLimitError>() {
            Some(_) => "request body is too large".to_owned(),
            None => error.to_string(),
        }
    })?;
    serde_json::from_slice(&collected.to_bytes()).map_err(|error| error.to_string())
}
