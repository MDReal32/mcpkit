use std::io::ErrorKind;

/// Treats a file that is not there as done, like `rm({ force: true })`.
pub fn ignore_missing_file(result: std::io::Result<()>) -> std::io::Result<()> {
    match result {
        Err(error) if error.kind() == ErrorKind::NotFound => Ok(()),
        other => other,
    }
}
