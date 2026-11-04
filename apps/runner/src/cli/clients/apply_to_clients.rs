use crate::cli::output::to_display_path;
use std::path::Path;
use usemcpkit_clients::{ClientError, DetectedClient};

/// Runs the action per client, reporting each outcome; one failing client does not stop the others. The number of
/// clients that failed.
pub fn apply_to_clients<A: Fn(&DetectedClient) -> Result<(), ClientError>>(
    clients: &[DetectedClient],
    home_dir: &Path,
    action: A,
) -> usize {
    let mut failed = 0;
    for client in clients {
        match action(client) {
            Ok(()) => println!(
                "  ✓ {}  {}",
                client.definition.name,
                to_display_path(&client.config_path, home_dir)
            ),
            Err(error) => {
                failed += 1;
                eprintln!("  ✗ {}: {error}", client.definition.name);
            }
        }
    }
    failed
}
