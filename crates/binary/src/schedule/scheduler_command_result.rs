#[derive(Clone, Debug, PartialEq, Eq)]
pub struct SchedulerCommandResult {
    pub exit_code: i32,
    pub stdout: String,
    pub stderr: String,
}
