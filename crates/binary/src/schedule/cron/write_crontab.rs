use crate::binary_error::BinaryError;
use crate::schedule::assert_scheduler_success::assert_scheduler_success;
use crate::schedule::run_scheduler_command::run_scheduler_command;
use mcpkit_core::env::Env;

pub async fn write_crontab(crontab: &str, env: &Env) -> Result<(), BinaryError> {
    let result = run_scheduler_command("crontab", &["-"], Some(crontab), env).await?;
    assert_scheduler_success(&result, "crontab -")
}
