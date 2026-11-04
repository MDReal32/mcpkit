use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::binary_update_result::BinaryUpdateResult;
use crate::install::is_installed_binary;
use crate::update::check_for_binary_update::check_for_binary_update;
use mcpkit_core::update::AUTO_UPDATE_ENV;

/// Runs for the runner that `mcpkit install` placed, unless `MCPKIT_AUTO_UPDATE` is `0`. The new server is picked up by
/// a running runner; a new runner takes effect the next time a client starts it. `None` when skipped.
pub async fn auto_update_binary(
    context: &BinaryContext,
    current_version: &str,
    now_ms: u64,
) -> Result<Option<BinaryUpdateResult>, BinaryError> {
    if context.env.get(AUTO_UPDATE_ENV) == Some("0") || !is_installed_binary(context) {
        return Ok(None);
    }
    check_for_binary_update(context, &context.exec_path, current_version, now_ms).await
}
