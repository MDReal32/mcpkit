use crate::window::commands::parse_window_size::parse_window_size;
use tauri::{LogicalSize, WebviewWindow};

/// Sizes the window to the card the page reports and fixes it there.
#[tauri::command]
pub fn fit_window(window: WebviewWindow, width: f64, height: f64) -> Result<(), String> {
    let (width, height) =
        parse_window_size(width, height).ok_or_else(|| format!("{width}x{height} is not a window size"))?;
    window
        .set_size(LogicalSize::new(f64::from(width), f64::from(height)))
        .map_err(|error| error.to_string())?;
    window.set_resizable(false).map_err(|error| error.to_string())
}
