use crate::AuthError;
use crate::token_store::read_tokens::read_tokens;
use crate::token_store::stored_token::StoredToken;
use crate::token_store::tokens_file::tokens_file;
use std::path::Path;

pub async fn read_stored_token(home: &Path, server_name: &str) -> Result<Option<StoredToken>, AuthError> {
    let file = tokens_file(home);
    let Some(token) = read_tokens(&file).await?.shift_remove(server_name) else {
        return Ok(None);
    };
    serde_json::from_value(token)
        .map(Some)
        .map_err(|error| AuthError(format!("{} {error}", file.display())))
}
