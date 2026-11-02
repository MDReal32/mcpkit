use crate::supervisor::worker_input::WorkerInput;
use std::sync::Arc;
use std::time::Duration;
use tokio::sync::{Notify, mpsc, oneshot, watch};

/// A running server process: lines sent to it go to its stdin, and `exited` holds its exit code once it is gone.
pub struct Worker {
    pub id: u64,
    pub input: mpsc::UnboundedSender<WorkerInput>,
    pub kill: Arc<Notify>,
    pub handshake: Option<oneshot::Receiver<String>>,
    pub exited: watch::Receiver<Option<i32>>,
}

impl Worker {
    pub fn send(&self, line: String) {
        if self.input.send(WorkerInput::Line(line)).is_err() {
            eprintln!("mcpkit: cannot write to the server process: it has exited");
        }
    }

    /// Closes the worker's stdin, which tells it to finish what it has and exit.
    pub fn finish(&self) {
        if self.input.send(WorkerInput::Finish).is_err() {
            eprintln!("mcpkit: cannot close the server's input: it has exited");
        }
    }

    pub fn kill(&self) {
        self.kill.notify_one();
    }

    pub fn kill_after(&self, delay: Duration) {
        let kill = Arc::clone(&self.kill);
        tokio::spawn(async move {
            tokio::time::sleep(delay).await;
            kill.notify_one();
        });
    }
}
