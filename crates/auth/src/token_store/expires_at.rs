use crate::timestamp::{format_timestamp, parse_timestamp};
use serde::de::Error;
use serde::{Deserialize, Deserializer, Serializer};

#[derive(Deserialize)]
#[serde(untagged)]
enum ExpiresAt {
    Milliseconds(f64),
    Time(String),
}

/// `expiresAt` is written as a UTC time such as `2026-11-18T09:12:00Z`.
pub fn serialize_expires_at<S: Serializer>(expires_at: &Option<f64>, serializer: S) -> Result<S::Ok, S::Error> {
    match expires_at {
        Some(epoch_ms) => serializer.serialize_str(&format_timestamp(*epoch_ms)),
        None => serializer.serialize_none(),
    }
}

/// `expiresAt` is read as a UTC time, or as the epoch milliseconds the first releases wrote.
pub fn deserialize_expires_at<'de, D: Deserializer<'de>>(deserializer: D) -> Result<Option<f64>, D::Error> {
    match Option::<ExpiresAt>::deserialize(deserializer)? {
        None => Ok(None),
        Some(ExpiresAt::Milliseconds(epoch_ms)) => Ok(Some(epoch_ms)),
        Some(ExpiresAt::Time(text)) => parse_timestamp(&text)
            .map(Some)
            .ok_or_else(|| D::Error::custom(format!("expiresAt {text} is not a UTC time"))),
    }
}
