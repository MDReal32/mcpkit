use crate::cli::consts::EXIT_FAILURE;
use crate::cli::run_local::run_local;

/// Runs a command that ends in an exit code, printing a failure as one line.
pub fn run_command<F: Future<Output = Result<i32, String>>>(command: F) -> i32 {
    run_local(async move {
        match command.await {
            Ok(code) => code,
            Err(error) => {
                eprintln!("mcpkit: {error}");
                EXIT_FAILURE
            }
        }
    })
}
