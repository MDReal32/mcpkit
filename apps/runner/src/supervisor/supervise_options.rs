use crate::supervisor::consts::BINARY_POLL_INTERVAL;
use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;
use tokio::io::{AsyncRead, AsyncWrite};
use tokio::sync::oneshot;
use usemcpkit_wire_log::{WireLog, WireLogRole};

pub struct SuperviseOptions {
    pub input: Box<dyn AsyncRead + Unpin + Send>,
    pub output: Box<dyn AsyncWrite + Unpin + Send>,
    pub watch_path: Option<PathBuf>,
    pub poll_interval: Duration,
    pub wire_log: Arc<WireLog>,
    /// Resolving it behaves like the client closing its input.
    pub stop: Option<oneshot::Receiver<()>>,
}

impl Default for SuperviseOptions {
    fn default() -> Self {
        SuperviseOptions {
            input: Box::new(tokio::io::stdin()),
            output: Box::new(tokio::io::stdout()),
            watch_path: None,
            poll_interval: BINARY_POLL_INTERVAL,
            wire_log: Arc::new(WireLog::disabled(WireLogRole::Supervisor)),
            stop: None,
        }
    }
}
