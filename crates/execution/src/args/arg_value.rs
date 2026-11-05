use crate::args::UploadedFile;
use serde_json::Value;

/// One argument: what the client sent, or the file or files read from the path it sent.
#[derive(Clone, Debug, PartialEq)]
pub enum ArgValue {
    Json(Value),
    File(UploadedFile),
    Files(Vec<UploadedFile>),
}

impl ArgValue {
    /// The value as the TypeScript executor saw it whenever it was not looking for files.
    pub fn to_json(&self) -> Value {
        match self {
            ArgValue::Json(value) => value.clone(),
            ArgValue::File(file) => file.to_json(),
            ArgValue::Files(files) => Value::Array(files.iter().map(UploadedFile::to_json).collect()),
        }
    }

    /// The files it holds, like `[value].flat().filter(isUploadedFile)`.
    pub fn uploaded_files(&self) -> Vec<&UploadedFile> {
        match self {
            ArgValue::Json(_) => Vec::new(),
            ArgValue::File(file) => vec![file],
            ArgValue::Files(files) => files.iter().collect(),
        }
    }
}
