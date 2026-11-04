use crate::supervisor::consts::SHUTDOWN_GRACE;
use crate::supervisor::handshake_record::HandshakeRecord;
use crate::supervisor::output_message::OutputMessage;
use crate::supervisor::replay_handshake::replay_handshake;
use crate::supervisor::retire_worker::retire_worker;
use crate::supervisor::spawn_worker::spawn_worker;
use crate::supervisor::supervisor_event::SupervisorEvent;
use crate::supervisor::worker::Worker;
use crate::supervisor::worker_launch::WorkerLaunch;
use serde_json::json;
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::mpsc;
use tokio::task::JoinHandle;
use usemcpkit_core::mcp::TOOLS_LIST_CHANGED;
use usemcpkit_wire_log::{WireLog, describe_wire_line};

/// The supervisor's state, changed only by the events of its one loop. A reload starts a replacement, replays the
/// client's handshake to it, switches new requests over and announces `tools/list_changed`; the old worker finishes the
/// requests it already has. A replacement that fails to start leaves the running worker alone.
pub struct SupervisorState {
    launch: WorkerLaunch,
    events: mpsc::UnboundedSender<SupervisorEvent>,
    output: mpsc::UnboundedSender<OutputMessage>,
    wire_log: Arc<WireLog>,
    next_id: u64,
    current: Worker,
    retired: HashMap<u64, Worker>,
    record: HandshakeRecord,
    closing: bool,
    reloading: bool,
    reload_pending: bool,
    watcher: Option<JoinHandle<()>>,
}

impl SupervisorState {
    pub fn start(
        launch: WorkerLaunch,
        events: mpsc::UnboundedSender<SupervisorEvent>,
        output: mpsc::UnboundedSender<OutputMessage>,
        wire_log: Arc<WireLog>,
        watcher: Option<JoinHandle<()>>,
    ) -> Self {
        wire_log.record("worker-start", json!({}));
        let current = spawn_worker(0, &launch, output.clone(), events.clone());
        SupervisorState {
            launch,
            events,
            output,
            wire_log,
            next_id: 1,
            current,
            retired: HashMap::new(),
            record: HandshakeRecord::default(),
            closing: false,
            reloading: false,
            reload_pending: false,
            watcher,
        }
    }

    /// Handles one event; returns the exit code once the current worker is gone.
    pub fn handle(&mut self, event: SupervisorEvent) -> Option<i32> {
        match event {
            SupervisorEvent::ClientLine(line) => self.on_client_line(line),
            SupervisorEvent::ClientClosed => self.on_client_closed(),
            SupervisorEvent::BinaryChanged => self.queue_reload(),
            SupervisorEvent::WorkerExited { id, code } => return self.on_worker_exited(id, code),
            SupervisorEvent::ReloadFinished { worker, result } => self.on_reload_finished(worker, result),
        }
        None
    }

    fn on_client_line(&mut self, line: String) {
        self.wire_log.record("client-in", describe_wire_line(&line));
        self.record.record_line(&line);
        self.current.send(line);
    }

    /// The worker's input is closed too, and it is killed if it is still running after a grace period, so a worker held
    /// up by an upstream process or an open credentials form never outlives the client.
    fn on_client_closed(&mut self) {
        if self.closing {
            return;
        }
        self.wire_log.record("client-closed", json!({}));
        self.closing = true;
        if let Some(watcher) = self.watcher.take() {
            watcher.abort();
        }
        self.current.finish();
        for worker in self.retired.values() {
            worker.kill();
        }
        self.current.kill_after(SHUTDOWN_GRACE);
    }

    fn on_worker_exited(&mut self, id: u64, code: i32) -> Option<i32> {
        let current = id == self.current.id;
        self.wire_log
            .record("worker-exit", json!({ "code": code, "current": current }));
        self.retired.remove(&id);
        current.then_some(code)
    }

    fn queue_reload(&mut self) {
        if self.closing {
            return;
        }
        if self.reloading {
            self.reload_pending = true;
            return;
        }
        self.reloading = true;
        self.wire_log.record("reload", json!({}));
        self.wire_log.record("worker-start", json!({}));
        let mut next = spawn_worker(self.next_id, &self.launch, self.output.clone(), self.events.clone());
        self.next_id += 1;
        let record = self.record.clone();
        let events = self.events.clone();
        tokio::spawn(async move {
            let result = replay_handshake(&mut next, &record).await;
            if events
                .send(SupervisorEvent::ReloadFinished { worker: next, result })
                .is_err()
            {
                eprintln!("usemcpkit: a reload finished after the supervisor stopped");
            }
        });
    }

    fn on_reload_finished(&mut self, worker: Worker, result: Result<String, String>) {
        self.reloading = false;
        match result {
            Err(error) => {
                worker.kill();
                eprintln!("usemcpkit: reload failed, the running server stays: {error}");
            }
            Ok(_) if self.closing => worker.kill(),
            Ok(version) => {
                eprintln!("usemcpkit: reloaded, now serving {version}");
                let previous = std::mem::replace(&mut self.current, worker);
                retire_worker(previous, &mut self.retired);
                if self.record.initialize.is_some() {
                    self.forward(TOOLS_LIST_CHANGED.to_string());
                }
            }
        }
        if self.reload_pending {
            self.reload_pending = false;
            self.queue_reload();
        }
    }

    fn forward(&self, line: String) {
        if self.output.send(OutputMessage::Line(line)).is_err() {
            eprintln!("usemcpkit: the client output is closed");
        }
    }
}
