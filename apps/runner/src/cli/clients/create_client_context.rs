use mcpkit_clients::ClientContext;
use mcpkit_core::env::Env;
use mcpkit_core::platform::Platform;

/// The clients of the user running mcpkit, found under their own home folder.
pub fn create_client_context() -> Result<ClientContext, String> {
    let home_dir = std::env::home_dir().ok_or("cannot find the home folder")?;
    Ok(ClientContext::new(Env::from_process(), Platform::current(), home_dir))
}
