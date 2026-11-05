use tokio::sync::watch;

/// The exit code once the worker is gone; 1 when its process task ended without reporting one.
pub async fn wait_for_exit(exited: &mut watch::Receiver<Option<i32>>) -> i32 {
    loop {
        if let Some(code) = *exited.borrow_and_update() {
            return code;
        }
        if exited.changed().await.is_err() {
            return exited.borrow().unwrap_or(1);
        }
    }
}
