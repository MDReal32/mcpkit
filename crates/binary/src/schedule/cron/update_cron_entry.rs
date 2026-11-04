use crate::binary_error::BinaryError;
use crate::schedule::cron::read_crontab::read_crontab;
use crate::schedule::cron::replace_cron_entry::replace_cron_entry;
use crate::schedule::cron::write_crontab::write_crontab;
use mcpkit_core::env::Env;

/// Sets mcpkit's crontab line to `line`, or removes it when `None`; `true` when the crontab changed.
pub async fn update_cron_entry(line: Option<&str>, env: &Env) -> Result<bool, BinaryError> {
    let current = read_crontab(env).await?;
    let updated = replace_cron_entry(&current, line);
    if updated == current {
        return Ok(false);
    }
    write_crontab(&updated, env).await?;
    Ok(true)
}
