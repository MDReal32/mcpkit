use crate::binary_error::BinaryError;
use crate::schedule::scheduler_command_result::SchedulerCommandResult;
use usemcpkit_core::js::js_trim;

pub fn assert_scheduler_success(result: &SchedulerCommandResult, description: &str) -> Result<(), BinaryError> {
    if result.exit_code == 0 {
        return Ok(());
    }
    let output = match js_trim(&result.stderr) {
        "" => js_trim(&result.stdout),
        stderr => stderr,
    };
    Err(BinaryError(format!(
        "{description} failed (exit {}): {output}",
        result.exit_code
    )))
}
