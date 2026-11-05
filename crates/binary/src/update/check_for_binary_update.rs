use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::binary_update_result::BinaryUpdateResult;
use crate::consts::UPDATE_CHECK_INTERVAL_MS;
use crate::update::read_update_state::read_update_state;
use crate::update::update_binary::update_binary;
use crate::update::update_state::UpdateState;
use crate::update::write_update_state::write_update_state;
use std::path::Path;

/// Updates the runner at `path` at most once per `UPDATE_CHECK_INTERVAL_MS`. The check is recorded only once it has
/// finished, so one that failed (offline, registry error) is tried again by the next caller instead of waiting out the
/// interval. `None` while the interval has not passed.
pub async fn check_for_binary_update(
    context: &BinaryContext,
    path: &Path,
    current_version: &str,
    now_ms: u64,
) -> Result<Option<BinaryUpdateResult>, BinaryError> {
    let state = read_update_state(&context.home_dir)?;
    let now = now_ms as f64;
    if now - state.checked_at < UPDATE_CHECK_INTERVAL_MS as f64 {
        return Ok(None);
    }
    let result = update_binary(context, path, current_version).await?;
    write_update_state(&context.home_dir, UpdateState { checked_at: now })?;
    Ok(Some(result))
}
