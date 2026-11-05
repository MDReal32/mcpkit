use crate::AuthError;
use crate::credentials::CredentialExchange;
use futures_util::future::Shared;
use usemcpkit_core::LocalFuture;

/// The open credentials form of one server, which every call that arrives while it is open awaits.
pub type PendingCredentialExchange = Shared<LocalFuture<'static, Result<CredentialExchange, AuthError>>>;
