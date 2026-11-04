use indexmap::IndexMap;
use usemcpkit_auth::{AuthContext, AuthError, SecretOwner};

/// The credentials a stdio upstream is started with, and the ones of them the user entered in the form.
pub struct ForwardedEnv {
    pub env: IndexMap<String, String>,
    pub entered: IndexMap<String, String>,
    pub owner: SecretOwner,
}

impl ForwardedEnv {
    /// Saves what the user entered, once the upstream has started with it.
    pub async fn commit(&self, context: &AuthContext) -> Result<(), AuthError> {
        let Some(store) = &context.secret_store else {
            return Ok(());
        };
        for (name, value) in &self.entered {
            store.set(&self.owner, name, value).await?;
        }
        Ok(())
    }
}
