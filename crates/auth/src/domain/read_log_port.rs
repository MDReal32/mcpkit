use crate::AuthError;
use crate::domain::consts::LOG_FILES_SEARCHED;
use crate::domain::list_log_files::list_log_files;
use crate::domain::parse_port::parse_port;
use regex::Regex;
use usemcpkit_manifest::LogPortSource;

/// The port of the last match in the newest log file that has one.
pub async fn read_log_port(source: &LogPortSource) -> Result<Option<u16>, AuthError> {
    let pattern = Regex::new(&source.pattern)
        .map_err(|error| AuthError(format!("log pattern \"{}\" is invalid: {error}", source.pattern)))?;
    for file in list_log_files(&source.files)
        .await?
        .into_iter()
        .take(LOG_FILES_SEARCHED)
    {
        let bytes = tokio::fs::read(&file)
            .await
            .map_err(|error| AuthError(format!("cannot read {}: {error}", file.display())))?;
        let text = String::from_utf8_lossy(&bytes);
        let port = pattern
            .captures_iter(&text)
            .filter_map(|captures| captures.get(1))
            .filter_map(|group| parse_port(group.as_str()))
            .last();
        if port.is_some() {
            return Ok(port);
        }
    }
    Ok(None)
}
