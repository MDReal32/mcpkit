use crate::supervisor::consts::RETIRED_WORKER_GRACE;
use crate::supervisor::worker::Worker;
use std::collections::HashMap;

/// Lets `worker` finish the requests it already has, then ends it; it is killed after the grace period.
pub fn retire_worker(worker: Worker, retired: &mut HashMap<u64, Worker>) {
    worker.finish();
    worker.kill_after(RETIRED_WORKER_GRACE);
    retired.insert(worker.id, worker);
}
