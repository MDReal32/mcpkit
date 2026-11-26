use crate::domain::read_env_port::read_env_port;
use crate::domain::read_log_port::read_log_port;
use crate::{AuthContext, AuthError};
use usemcpkit_manifest::{DomainDiscovery, PortSource};

/// `host:port` with the first port a source yields, none when no source has one (the program is not running, or never
/// logged it).
pub async fn discover_domain(discovery: &DomainDiscovery, context: &AuthContext) -> Result<Option<String>, AuthError> {
    for source in &discovery.ports {
        let port = match source {
            PortSource::Env(source) => read_env_port(source, &context.env),
            PortSource::Log(source) => read_log_port(source).await?,
        };
        if let Some(port) = port {
            return Ok(Some(format!("{}:{port}", discovery.host)));
        }
    }
    Ok(None)
}
