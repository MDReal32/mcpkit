use crate::supervisor::wait_for_exit::wait_for_exit;
use crate::supervisor::worker::Worker;
use std::time::Duration;

pub async fn await_handshake(worker: &mut Worker, timeout: Duration) -> Result<String, String> {
    let Some(handshake) = worker.handshake.take() else {
        return Err("the handshake response was already taken".into());
    };
    let mut exited = worker.exited.clone();
    let exited_early = |code: i32| format!("the new server exited with code {code} before answering initialize");
    tokio::select! {
        response = handshake => match response {
            Ok(line) => Ok(line),
            Err(_) => Err(exited_early(wait_for_exit(&mut exited).await)),
        },
        code = wait_for_exit(&mut worker.exited) => Err(exited_early(code)),
        () = tokio::time::sleep(timeout) => Err(format!("no initialize response within {} ms", timeout.as_millis())),
    }
}
