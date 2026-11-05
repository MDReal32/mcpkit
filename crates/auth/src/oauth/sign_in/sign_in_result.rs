use crate::token_store::StoredToken;
use std::path::PathBuf;

#[derive(Clone, Debug, PartialEq)]
pub struct SignInResult {
    pub token: StoredToken,
    pub tokens_file: PathBuf,
}
