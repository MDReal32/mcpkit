use crate::consts::REQUEST_TIMEOUT;
use crate::transport::read_json_rpc_result::read_json_rpc_result;
use crate::upstream_error::UpstreamError;
use serde_json::Value;
use std::collections::HashMap;
use std::sync::{Mutex, MutexGuard, PoisonError};
use tokio::sync::oneshot;

type Reply = oneshot::Receiver<Result<Value, UpstreamError>>;

struct PendingState {
    next_id: u64,
    waiting: HashMap<u64, oneshot::Sender<Result<Value, UpstreamError>>>,
    /// Set once the channel is gone; every later request fails with it.
    closed: Option<UpstreamError>,
}

/// Matches JSON-RPC replies to the requests waiting for them. The reader task settles them from another task, hence
/// the lock. A reply whose request already timed out has no one to hand it to and is dropped.
pub struct PendingRequests {
    state: Mutex<PendingState>,
}

impl PendingRequests {
    pub fn new() -> Self {
        PendingRequests {
            state: Mutex::new(PendingState {
                next_id: 1,
                waiting: HashMap::new(),
                closed: None,
            }),
        }
    }

    pub fn open(&self) -> Result<(u64, Reply), UpstreamError> {
        let mut state = self.lock();
        if let Some(closed) = &state.closed {
            return Err(closed.clone());
        }
        let id = state.next_id;
        state.next_id += 1;
        let (sender, reply) = oneshot::channel();
        state.waiting.insert(id, sender);
        Ok((id, reply))
    }

    /// The reply to `id`, or a failure once `REQUEST_TIMEOUT` passed without one.
    pub async fn wait(&self, id: u64, reply: Reply) -> Result<Value, UpstreamError> {
        match tokio::time::timeout(REQUEST_TIMEOUT, reply).await {
            Ok(Ok(outcome)) => outcome,
            Ok(Err(_)) => Err(UpstreamError::new("the upstream connection closed before it replied")),
            Err(_) => {
                self.forget(id);
                Err(UpstreamError::new(format!(
                    "no reply within {}s",
                    REQUEST_TIMEOUT.as_secs()
                )))
            }
        }
    }

    pub fn forget(&self, id: u64) {
        self.lock().waiting.remove(&id);
    }

    /// Hands a reply to the request it answers; a request or notification from the upstream answers none.
    pub fn settle(&self, message: &Value) {
        if message.get("method").is_some() {
            return;
        }
        let Some(id) = message.get("id").and_then(Value::as_u64) else {
            return;
        };
        let waiting = self.lock().waiting.remove(&id);
        if let Some(sender) = waiting {
            let _timed_out = sender.send(read_json_rpc_result(message));
        }
    }

    pub fn close_with(&self, error: UpstreamError) {
        let mut state = self.lock();
        for (_, sender) in state.waiting.drain() {
            let _timed_out = sender.send(Err(error.clone()));
        }
        state.closed = Some(error);
    }

    pub fn is_open(&self) -> bool {
        self.lock().closed.is_none()
    }

    /// The table stays consistent at every step, so a lock a panicking holder left behind is still used.
    fn lock(&self) -> MutexGuard<'_, PendingState> {
        self.state.lock().unwrap_or_else(PoisonError::into_inner)
    }
}
