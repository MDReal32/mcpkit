use serde_json::{Map, Value};

/// Turns the data of version N into version N+1; its place in the list is N - 1, so the first entry upgrades version 1.
pub type Migration = fn(Map<String, Value>) -> Map<String, Value>;
