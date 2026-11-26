use crate::AuthError;
use crate::domain::consts::HOME_PREFIX;
use std::path::PathBuf;
use std::time::SystemTime;

/// The files the glob patterns match, the one changed last first; `~/` in a pattern is the user's home.
pub async fn list_log_files(patterns: &[String]) -> Result<Vec<PathBuf>, AuthError> {
    let mut files: Vec<(SystemTime, PathBuf)> = Vec::new();
    for pattern in patterns {
        let expanded = expand_home(pattern)?;
        let matches = glob::glob(&expanded)
            .map_err(|error| AuthError(format!("log file pattern \"{pattern}\" is invalid: {error}")))?;
        for entry in matches {
            let path = entry.map_err(|error| AuthError(format!("cannot list \"{pattern}\": {error}")))?;
            let modified = tokio::fs::metadata(&path)
                .await
                .and_then(|metadata| metadata.modified())
                .map_err(|error| AuthError(format!("cannot read {}: {error}", path.display())))?;
            files.push((modified, path));
        }
    }
    files.sort_by_key(|(modified, _)| std::cmp::Reverse(*modified));
    Ok(files.into_iter().map(|(_, path)| path).collect())
}

fn expand_home(pattern: &str) -> Result<String, AuthError> {
    let Some(rest) = pattern.strip_prefix(HOME_PREFIX) else {
        return Ok(pattern.to_owned());
    };
    let home = std::env::home_dir().ok_or_else(|| AuthError("cannot find the home folder".to_owned()))?;
    Ok(home.join(rest).to_string_lossy().into_owned())
}
