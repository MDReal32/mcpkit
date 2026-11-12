use crate::OpenApiError;
use regex::Regex;

/// The first capture of `pattern` in `text` (the whole match when it has none); `None` when it does not match.
pub fn capture_version(pattern: &str, text: &str) -> Result<Option<String>, OpenApiError> {
    let regex = Regex::new(pattern).map_err(|error| {
        OpenApiError(format!(
            "version pattern \"{pattern}\" is not a regular expression: {error}"
        ))
    })?;
    Ok(regex.captures(text).and_then(|captures| {
        captures
            .get(1)
            .or_else(|| captures.get(0))
            .map(|found| found.as_str().to_owned())
    }))
}
