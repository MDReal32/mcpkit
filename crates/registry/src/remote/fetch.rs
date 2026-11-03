use crate::registry_error::RegistryError;

/// How the registry reaches the network; tests serve a folder instead.
pub trait Fetch {
    /// The body of a successful GET of `url`, as text.
    fn fetch_text(&self, url: &str) -> impl Future<Output = Result<String, RegistryError>>;
}
