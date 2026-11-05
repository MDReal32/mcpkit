use crate::cli::consts::EXIT_FAILURE;
use tokio::runtime::Builder;
use tokio::task::LocalSet;

/// Runs a command on one thread: the update and registry work holds `Rc` contexts, which only a `LocalSet` can spawn.
pub fn run_local<F: Future<Output = i32>>(command: F) -> i32 {
    let runtime = match Builder::new_current_thread().enable_all().build() {
        Ok(runtime) => runtime,
        Err(error) => {
            eprintln!("usemcpkit: cannot start the runtime: {error}");
            return EXIT_FAILURE;
        }
    };
    let code = LocalSet::new().block_on(&runtime, command);
    runtime.shutdown_background();
    code
}
