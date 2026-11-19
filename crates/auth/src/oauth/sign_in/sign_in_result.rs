use crate::token_store::StoredToken;
use std::path::PathBuf;

#[derive(Clone, Debug, PartialEq)]
pub struct SignInResult {
    pub token: StoredToken,
    /// The config file the token was saved in.
    pub config_file: PathBuf,
}
