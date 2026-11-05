use std::future::Future;
use std::pin::Pin;

/// A boxed future that stays on the thread that made it, so traits with async methods can be used as `dyn` objects on
/// the server's single-threaded runtime.
pub type LocalFuture<'a, T> = Pin<Box<dyn Future<Output = T> + 'a>>;
