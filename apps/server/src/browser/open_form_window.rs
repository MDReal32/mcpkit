use crate::browser::fall_back_to_browser::fall_back_to_browser;
use crate::browser::form_window_command::form_window_command;
use crate::window_app::install_window_app;
use std::path::Path;
use tokio::io::AsyncWriteExt;
use usemcpkit_auth::credentials::CredentialRequest;
use usemcpkit_core::js::to_js_json;

/// Shows the form in the credentials window program embedded in this binary (`usemcpkit-window <url>` with the request
/// on stdin, a process of its own because the webview blocks its thread). When that window cannot open, it says so and
/// opens the default browser instead.
pub fn open_form_window(home: &Path, url: &str, request: &CredentialRequest) {
    let spawned = start_window(home, url, request);
    let (mut child, request_json) = match spawned {
        Ok(started) => started,
        Err(reason) => return fall_back_to_browser(url, &reason),
    };
    let stdin = child.stdin.take();
    let url = url.to_owned();
    tokio::spawn(async move {
        if let Some(mut stdin) = stdin
            && let Err(error) = stdin.write_all(request_json.as_bytes()).await
        {
            return fall_back_to_browser(&url, &format!("cannot hand the request to the window: {error}"));
        }
        match child.wait_with_output().await {
            Ok(output) if output.status.success() => {}
            Ok(output) => {
                let stderr = String::from_utf8_lossy(&output.stderr).trim().to_owned();
                let reason = match stderr.is_empty() {
                    true => format!("exit {}", output.status.code().unwrap_or(-1)),
                    false => stderr,
                };
                fall_back_to_browser(&url, &reason);
            }
            Err(error) => fall_back_to_browser(&url, &error.to_string()),
        }
    });
}

fn start_window(
    home: &Path,
    url: &str,
    request: &CredentialRequest,
) -> Result<(tokio::process::Child, String), String> {
    let program = install_window_app(home)?;
    let request = serde_json::to_value(request).map_err(|error| error.to_string())?;
    let child = form_window_command(&program, url)
        .spawn()
        .map_err(|error| format!("cannot start {}: {error}", program.display()))?;
    Ok((child, to_js_json(&request)))
}
