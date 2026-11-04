use crate::cli::output::to_display_path;
use mcpkit_clients::DetectedClient;
use std::path::Path;

pub fn describe_client(client: &DetectedClient, home_dir: &Path) -> String {
    match &client.problem {
        Some(problem) => problem.clone(),
        None => to_display_path(&client.config_path, home_dir),
    }
}
