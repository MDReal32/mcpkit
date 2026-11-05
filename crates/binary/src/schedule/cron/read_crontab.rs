use crate::binary_error::BinaryError;
use crate::schedule::assert_scheduler_success::assert_scheduler_success;
use crate::schedule::consts::NO_CRONTAB_TEXT;
use crate::schedule::run_scheduler_command::run_scheduler_command;
use usemcpkit_core::env::Env;

/// The user's crontab; empty when they have none yet.
pub async fn read_crontab(env: &Env) -> Result<String, BinaryError> {
    let result = run_scheduler_command("crontab", &["-l"], None, env).await?;
    if result.exit_code != 0 && result.stderr.to_lowercase().contains(NO_CRONTAB_TEXT) {
        return Ok(String::new());
    }
    assert_scheduler_success(&result, "crontab -l")?;
    Ok(result.stdout)
}
