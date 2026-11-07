use crate::window::commands::parse_open_link::parse_open_link;
use usemcpkit_core::browser::open_browser;

/// Hands an http(s) link to the default browser.
#[tauri::command]
pub fn open_link(url: String) -> Result<(), String> {
    let link = parse_open_link(&url).ok_or_else(|| format!("{url} is not an http(s) link"))?;
    open_browser(&link);
    Ok(())
}
