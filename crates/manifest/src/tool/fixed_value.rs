use serde::{Deserialize, Serialize};
use serde_json::Number;

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(untagged)]
pub enum FixedValue {
    String(String),
    Number(Number),
    Bool(bool),
}
