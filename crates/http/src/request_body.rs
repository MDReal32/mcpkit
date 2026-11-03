use crate::form_part::FormPart;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub enum RequestBody {
    Text(String),
    Bytes(Vec<u8>),
    /// `multipart/form-data`; the client sets the content type with its boundary.
    Form(Vec<FormPart>),
}
