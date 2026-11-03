use crate::form_value::FormValue;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct FormPart {
    pub name: String,
    pub value: FormValue,
}
