use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub enum FormValue {
    Text(String),
    #[serde(rename_all = "camelCase")]
    File {
        file_name: String,
        data: Vec<u8>,
    },
}
