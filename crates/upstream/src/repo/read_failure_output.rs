use crate::repo::consts::ERROR_TAIL_LINES;

/// The last lines of what a failed program wrote to stderr, or `fallback` when it wrote nothing.
pub fn read_failure_output(stderr: &[u8], fallback: String) -> String {
    let stderr = String::from_utf8_lossy(stderr);
    let stderr = stderr.trim();
    if stderr.is_empty() {
        return fallback;
    }
    let lines: Vec<&str> = stderr.split('\n').collect();
    lines[lines.len().saturating_sub(ERROR_TAIL_LINES)..].join("\n")
}
