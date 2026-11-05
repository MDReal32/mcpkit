use usemcpkit_clients::ClientContext;
use usemcpkit_core::env::Env;
use usemcpkit_core::platform::Platform;

/// The clients of the user running usemcpkit, found under their own home folder.
pub fn create_client_context() -> Result<ClientContext, String> {
    let home_dir = std::env::home_dir().ok_or("cannot find the home folder")?;
    Ok(ClientContext::new(Env::from_process(), Platform::current(), home_dir))
}
