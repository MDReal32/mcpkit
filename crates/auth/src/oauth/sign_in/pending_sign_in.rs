use crate::AuthError;
use crate::oauth::sign_in::sign_in_result::SignInResult;
use futures_util::future::Shared;
use usemcpkit_core::LocalFuture;

/// A browser sign-in every concurrent call for one server and auth entry awaits.
pub type PendingSignIn = Shared<LocalFuture<'static, Result<SignInResult, AuthError>>>;
