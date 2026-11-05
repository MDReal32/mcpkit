use std::path::PathBuf;

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum BinaryUpdateResult {
    UpToDate { version: String },
    Updated { from: String, to: String, path: PathBuf },
}
