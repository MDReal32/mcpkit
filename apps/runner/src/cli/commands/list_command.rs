use crate::cli::consts::EXIT_SUCCESS;
use crate::cli::registry::create_registry_context;
use crate::cli::run_command::run_command;
use mcpkit_registry::{ensure_manifest_index, read_cached_index};

pub fn list_command() -> i32 {
    run_command(async {
        let context = create_registry_context(None)?;
        ensure_manifest_index(&context).await?;
        let index = read_cached_index(&context.dir)
            .await
            .map_err(|error| error.to_string())?
            .ok_or("no registry index found; run `usemcpkit update` to download it")?;
        for server in &index.servers {
            println!("{} — {}", server.id, server.description.as_deref().unwrap_or_default());
        }
        Ok(EXIT_SUCCESS)
    })
}
