use crate::supervisor::worker::Worker;

pub enum SupervisorEvent {
    ClientLine(String),
    ClientClosed,
    BinaryChanged,
    WorkerExited {
        id: u64,
        code: i32,
    },
    ReloadFinished {
        worker: Worker,
        result: Result<String, String>,
    },
}
