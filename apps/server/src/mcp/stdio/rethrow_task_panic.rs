use tokio::task::JoinError;

/// A line task that panicked takes the server down with it, as it would have without the task. A task is only ever
/// cancelled by the runtime shutting down, which ends serving anyway.
pub fn rethrow_task_panic<T>(result: Result<T, JoinError>) {
    if let Err(error) = result
        && error.is_panic()
    {
        std::panic::resume_unwind(error.into_panic());
    }
}
