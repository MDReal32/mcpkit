use crate::catalog::load_catalog;
use crate::mcp::{McpServer, serve_stdio};
use mcpkit_registry::{HttpFetcher, RegistryContext};
use mcpkit_wire_log::{WireLog, WireLogRole};
use std::rc::Rc;
use tokio::runtime::Builder;
use tokio::task::LocalSet;

/// One thread serves every request: the work is waiting on the network and the client, and staying on one thread lets
/// the catalog and the tool list be shared without locks.
pub fn serve_command(servers: &[String]) -> i32 {
    let runtime = match Builder::new_current_thread().enable_all().build() {
        Ok(runtime) => runtime,
        Err(error) => {
            eprintln!("mcpkit: cannot start the async runtime: {error}");
            return 1;
        }
    };
    match LocalSet::new().block_on(&runtime, serve(servers)) {
        Ok(()) => 0,
        Err(error) => {
            eprintln!("mcpkit: {error}");
            1
        }
    }
}

async fn serve(servers: &[String]) -> Result<(), String> {
    let wire_log = Rc::new(WireLog::from_env(WireLogRole::Server));
    let fetcher = HttpFetcher::new().map_err(|error| error.to_string())?;
    let context = RegistryContext::from_env(None, fetcher).map_err(|error| error.to_string())?;
    let catalog = load_catalog(servers, context).await?;
    let ids: Vec<&str> = catalog.servers.iter().map(|server| server.id.as_str()).collect();
    eprintln!("mcpkit {}: serving {}", env!("CARGO_PKG_VERSION"), ids.join(", "));
    let server = Rc::new(McpServer::new(catalog, Rc::clone(&wire_log)));
    serve_stdio(server, tokio::io::stdin(), tokio::io::stdout(), wire_log).await
}
