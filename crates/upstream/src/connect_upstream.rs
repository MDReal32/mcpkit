use crate::repo::{RepoOptions, prepare_repo};
use crate::session::initialize_session;
use crate::transport::create_transport;
use crate::upstream_connection::UpstreamConnection;
use crate::upstream_error::UpstreamError;
use crate::upstream_options::UpstreamOptions;
use mcpkit_manifest::upstream::UpstreamSpec;
use std::rc::Rc;

/// Clones the repository of a stdio upstream if it has one and needs it (and keeps it up to date), starts the
/// transport and runs the initialize handshake; the connection is ready for `tools/list` and `tools/call`.
pub async fn connect_upstream(
    spec: &UpstreamSpec,
    options: &UpstreamOptions,
) -> Result<UpstreamConnection, UpstreamError> {
    let ready = match spec {
        UpstreamSpec::Stdio(stdio) => {
            let repo_options = RepoOptions {
                check: options.check_repo,
                warn: Rc::clone(&options.warn),
                now: Rc::clone(&options.now),
                env: options.process_env.clone(),
            };
            UpstreamSpec::Stdio(Box::new(
                prepare_repo(stdio, options.repo_dir.as_deref(), &repo_options).await?,
            ))
        }
        UpstreamSpec::Http(_) => spec.clone(),
    };
    let transport = create_transport(&ready, options)?;
    if let Err(error) = initialize_session(transport.as_ref(), &options.client_version).await {
        transport.close().await;
        return Err(error);
    }
    Ok(UpstreamConnection::new(transport))
}
