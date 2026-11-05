use crate::supervisor::await_handshake::await_handshake;
use crate::supervisor::consts::{HANDSHAKE_REQUEST_ID, HANDSHAKE_TIMEOUT, SYNTHETIC_INITIALIZE};
use crate::supervisor::handshake_record::HandshakeRecord;
use crate::supervisor::read_server_version::read_server_version;
use crate::supervisor::replace_line_id::replace_line_id;
use crate::supervisor::worker::Worker;

/// Proves `worker` answers initialize, using the client's own handshake when there is one. Resolves to its version.
pub async fn replay_handshake(worker: &mut Worker, record: &HandshakeRecord) -> Result<String, String> {
    let initialize = match &record.initialize {
        Some(line) => replace_line_id(line, HANDSHAKE_REQUEST_ID)?,
        None => SYNTHETIC_INITIALIZE.to_string(),
    };
    worker.send(initialize);
    let version = read_server_version(&await_handshake(worker, HANDSHAKE_TIMEOUT).await?);
    if let Some(initialized) = &record.initialized {
        worker.send(initialized.clone());
    }
    Ok(version)
}
