use crate::catalog::load_catalog;
use crate::cli::adopt_legacy_credentials::adopt_legacy_credentials;
use crate::cli::create_call_context::create_call_context;
use crate::mcp::{McpServer, ToolLoading, serve_stdio};
use std::rc::Rc;
use tokio::runtime::Builder;
use tokio::task::LocalSet;
use usemcpkit_core::mcp::PARTIAL_LOADING_ENV;
use usemcpkit_registry::{RegistrySource, open_registry_context};
use usemcpkit_wire_log::{WireLog, WireLogRole};

/// One thread serves every request: the work is waiting on the network and the client, and staying on one thread lets
/// the catalog and the tool list be shared without locks.
pub fn serve_command(servers: &[String], registry: RegistrySource) -> i32 {
    let runtime = match Builder::new_current_thread().enable_all().build() {
        Ok(runtime) => runtime,
        Err(error) => {
            eprintln!("usemcpkit: cannot start the async runtime: {error}");
            return 1;
        }
    };
    match LocalSet::new().block_on(&runtime, serve(servers, registry)) {
        Ok(()) => 0,
        Err(error) => {
            eprintln!("usemcpkit: {error}");
            1
        }
    }
}

async fn serve(servers: &[String], registry: RegistrySource) -> Result<(), String> {
    let wire_log = Rc::new(WireLog::from_env(WireLogRole::Server));
    let calls = create_call_context()?;
    adopt_legacy_credentials(&calls.auth.env, &calls.auth.home).await;
    let context = open_registry_context(None, registry).map_err(|error| error.to_string())?;
    let catalog = load_catalog(servers, context, calls.clone()).await?;
    let ids: Vec<&str> = catalog.servers.iter().map(|server| server.id.as_str()).collect();
    eprintln!("usemcpkit {}: serving {}", env!("CARGO_PKG_VERSION"), ids.join(", "));
    let loading = ToolLoading::from_env_value(calls.auth.env.get(PARTIAL_LOADING_ENV));
    let server = Rc::new(McpServer::new(catalog, Rc::clone(&wire_log), calls, loading));
    let served = serve_stdio(Rc::clone(&server), tokio::io::stdin(), tokio::io::stdout(), wire_log).await;
    server.close().await;
    served
}
