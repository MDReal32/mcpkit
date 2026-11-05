use std::error::Error;

/// The error and its causes, without the URL: query auth puts the secret in it, and the text reaches the model.
pub fn describe_reqwest_error(error: reqwest::Error) -> String {
    let error = error.without_url();
    let mut parts = vec![error.to_string()];
    let mut source = error.source();
    while let Some(cause) = source {
        parts.push(cause.to_string());
        source = cause.source();
    }
    parts.join(": ")
}
