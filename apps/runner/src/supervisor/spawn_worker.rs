use crate::supervisor::consts::HANDSHAKE_REQUEST_ID;
use crate::supervisor::line_header::read_line_header;
use crate::supervisor::output_message::OutputMessage;
use crate::supervisor::supervisor_event::SupervisorEvent;
use crate::supervisor::worker::Worker;
use crate::supervisor::worker_input::WorkerInput;
use crate::supervisor::worker_launch::WorkerLaunch;
use serde_json::Value;
use std::process::Stdio;
use std::sync::Arc;
use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader};
use tokio::process::{ChildStdin, ChildStdout, Command};
use tokio::sync::{Notify, mpsc, oneshot, watch};

/// Starts `launch`; every line it prints goes to `output`, except the answer to the replayed initialize, and its exit
/// is reported as `WorkerExited` once its output has been read to the end.
pub fn spawn_worker(
    id: u64,
    launch: &WorkerLaunch,
    output: mpsc::UnboundedSender<OutputMessage>,
    events: mpsc::UnboundedSender<SupervisorEvent>,
) -> Worker {
    let (input, input_rx) = mpsc::unbounded_channel();
    let (handshake_tx, handshake) = oneshot::channel();
    let (exited_tx, exited) = watch::channel(None);
    let kill = Arc::new(Notify::new());
    let mut command = Command::new(&launch.command);
    command
        .args(&launch.args)
        .envs(launch.env.iter().cloned())
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::inherit());
    let process_kill = Arc::clone(&kill);
    let display = launch.command.display().to_string();
    tokio::spawn(async move {
        let code = run_worker_process(command, &display, input_rx, handshake_tx, output, process_kill).await;
        exited_tx.send_replace(Some(code));
        if events.send(SupervisorEvent::WorkerExited { id, code }).is_err() {
            eprintln!("usemcpkit: the server exited with code {code} after the supervisor stopped");
        }
    });
    Worker {
        id,
        input,
        kill,
        handshake: Some(handshake),
        exited,
    }
}

async fn run_worker_process(
    mut command: Command,
    display: &str,
    input: mpsc::UnboundedReceiver<WorkerInput>,
    handshake: oneshot::Sender<String>,
    output: mpsc::UnboundedSender<OutputMessage>,
    kill: Arc<Notify>,
) -> i32 {
    let mut child = match command.spawn() {
        Ok(child) => child,
        Err(error) => {
            eprintln!("usemcpkit: cannot run {display}: {error}");
            return 1;
        }
    };
    let (Some(stdin), Some(stdout)) = (child.stdin.take(), child.stdout.take()) else {
        eprintln!("usemcpkit: {display} started without piped stdio");
        return 1;
    };
    let writer = tokio::spawn(write_worker_input(stdin, input));
    let reader = tokio::spawn(read_worker_output(stdout, handshake, output));
    let status = tokio::select! {
        status = child.wait() => status,
        () = kill.notified() => {
            if let Err(error) = child.start_kill() {
                eprintln!("usemcpkit: cannot stop {display}: {error}");
            }
            child.wait().await
        }
    };
    if let Err(error) = reader.await {
        eprintln!("usemcpkit: reading the output of {display} failed: {error}");
    }
    writer.abort();
    match status {
        Ok(status) => status.code().unwrap_or(1),
        Err(error) => {
            eprintln!("usemcpkit: cannot wait for {display}: {error}");
            1
        }
    }
}

async fn write_worker_input(mut stdin: ChildStdin, mut input: mpsc::UnboundedReceiver<WorkerInput>) {
    while let Some(WorkerInput::Line(line)) = input.recv().await {
        let written = async {
            stdin.write_all(line.as_bytes()).await?;
            stdin.write_all(b"\n").await?;
            stdin.flush().await
        };
        if let Err(error) = written.await {
            eprintln!("usemcpkit: cannot write to the server process: {error}");
        }
    }
}

async fn read_worker_output(
    stdout: ChildStdout,
    handshake: oneshot::Sender<String>,
    output: mpsc::UnboundedSender<OutputMessage>,
) {
    let mut handshake = Some(handshake);
    let mut lines = BufReader::new(stdout).lines();
    loop {
        let line = match lines.next_line().await {
            Ok(Some(line)) => line,
            Ok(None) => return,
            Err(error) => {
                eprintln!("usemcpkit: cannot read the server's output: {error}");
                return;
            }
        };
        if read_line_header(&line).id == Some(Value::String(HANDSHAKE_REQUEST_ID.into())) {
            if let Some(answer) = handshake.take()
                && answer.send(line).is_err()
            {
                eprintln!("usemcpkit: the server answered the replayed initialize after the reload gave up");
            }
            continue;
        }
        if output.send(OutputMessage::Line(line)).is_err() {
            return;
        }
    }
}
