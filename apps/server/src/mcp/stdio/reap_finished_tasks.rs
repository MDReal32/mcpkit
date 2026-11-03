use crate::mcp::stdio::rethrow_task_panic::rethrow_task_panic;
use tokio::task::JoinSet;

/// Drops the line tasks that are done, so what is left is the requests still in flight.
pub fn reap_finished_tasks(tasks: &mut JoinSet<()>) {
    while let Some(result) = tasks.try_join_next() {
        rethrow_task_panic(result);
    }
}
