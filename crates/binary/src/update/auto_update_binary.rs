use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::binary_update_result::BinaryUpdateResult;
use crate::install::is_installed_binary;
use crate::update::check_for_binary_update::check_for_binary_update;

/// Runs for the runner that `usemcpkit install` placed, unless `USEMCPKIT_AUTOUPDATE` is `0` or it is a dev build. The new server is picked up by
/// a running runner; a new runner takes effect the next time a client starts it. `None` when skipped.
pub async fn auto_update_binary(
    context: &BinaryContext,
    current_version: &str,
    now_ms: u64,
) -> Result<Option<BinaryUpdateResult>, BinaryError> {
    if !context.updates_itself() || !is_installed_binary(context) {
        return Ok(None);
    }
    check_for_binary_update(context, &context.exec_path, current_version, now_ms).await
}
