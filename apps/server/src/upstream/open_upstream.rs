use crate::upstream::create_upstream_options::create_upstream_options;
use mcpkit_core::LocalFuture;
use mcpkit_execution::CallContext;
use mcpkit_execution::upstream::{UpstreamAccess, with_upstream_access};
use mcpkit_manifest::Manifest;
use mcpkit_upstream::{UpstreamConnection, UpstreamError, connect_upstream};
use std::rc::Rc;

/// Connects with the manifest's auth and runs `use_connection` on the connection. When it fails (a 401 moves on to the
/// next auth option), the connection is closed; otherwise the caller owns it.
pub async fn open_upstream<T, U>(
    manifest: &Manifest,
    calls: &CallContext,
    use_connection: U,
) -> Result<(Rc<UpstreamConnection>, T), UpstreamError>
where
    U: Fn(Rc<UpstreamConnection>) -> LocalFuture<'static, Result<T, UpstreamError>>,
{
    let base = &create_upstream_options(manifest, calls);
    let use_connection = &use_connection;
    let attempt = |access: UpstreamAccess| -> LocalFuture<'_, _> {
        Box::pin(async move {
            let mut options = base.clone();
            options.headers = access.headers;
            options.env = access.env;
            let connection = Rc::new(connect_upstream(&access.upstream, &options).await?);
            match use_connection(Rc::clone(&connection)).await {
                Ok(result) => Ok((connection, result)),
                Err(error) => {
                    connection.close().await;
                    Err(error)
                }
            }
        })
    };
    with_upstream_access(manifest, attempt, calls).await
}
