use crate::AuthError;
use crate::token_store::StoredToken;
use futures_util::future::Shared;
use mcpkit_core::LocalFuture;

/// A token request every concurrent call for one server awaits, so a rotating refresh token is used only once.
pub type PendingToken = Shared<LocalFuture<'static, Result<StoredToken, AuthError>>>;
