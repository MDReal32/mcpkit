use tauri::WebviewWindow;

/// Closes the window, which ends the process with it.
#[tauri::command]
pub fn close_window(window: WebviewWindow) -> Result<(), String> {
    window.close().map_err(|error| error.to_string())
}
