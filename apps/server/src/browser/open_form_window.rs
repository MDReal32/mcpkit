use crate::browser::fall_back_to_browser::fall_back_to_browser;
use crate::browser::form_window_command::form_window_command;

/// Shows the form in the server's own native window (`usemcpkit-server window <url>`, a process of its own because the
/// webview blocks its thread). When that window cannot open, it says so and opens the default browser instead.
pub fn open_form_window(url: &str) {
    let spawned = std::env::current_exe()
        .and_then(|program| form_window_command(program, url).spawn())
        .map_err(|error| error.to_string());
    let child = match spawned {
        Ok(child) => child,
        Err(reason) => return fall_back_to_browser(url, &reason),
    };
    let url = url.to_owned();
    tokio::spawn(async move {
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
