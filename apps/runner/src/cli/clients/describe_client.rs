use crate::cli::output::to_display_path;
use std::path::Path;
use usemcpkit_clients::DetectedClient;

pub fn describe_client(client: &DetectedClient, home_dir: &Path) -> String {
    match &client.problem {
        Some(problem) => problem.clone(),
        None => to_display_path(&client.config_path, home_dir),
    }
}
