/// How many of the most recently changed log files are searched for the port, since a program writes it once at start
/// and a long session can push that line out of the newest file.
pub const LOG_FILES_SEARCHED: usize = 5;

pub const HOME_PREFIX: &str = "~/";
