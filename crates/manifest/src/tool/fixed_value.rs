use serde::{Deserialize, Serialize};
use serde_json::Number;

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(untagged)]
pub enum FixedValue {
    String(String),
    Number(Number),
    Bool(bool),
}

impl FixedValue {
    pub fn to_value(&self) -> serde_json::Value {
        match self {
            FixedValue::String(text) => serde_json::Value::String(text.clone()),
            FixedValue::Number(number) => serde_json::Value::Number(number.clone()),
            FixedValue::Bool(flag) => serde_json::Value::Bool(*flag),
        }
    }
}
