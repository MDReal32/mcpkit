use crate::window::consts::{CLOSE_BINDING, CONTEXT_GLOBAL, FIT_BINDING, OPEN_LINK_BINDING};
use crate::window::form_launch::FormLaunch;
use serde_json::json;

/// Defines the page's `window.<CONTEXT_GLOBAL>` (form API origin, session token, request) and its window functions;
/// each function invokes the Tauri command of the same purpose and logs a refusal.
pub fn window_binding_script(launch: &FormLaunch) -> String {
    let context = json!({ "api": launch.api, "session": launch.session, "request": launch.request });
    format!(
        r#"(() => {{
window.{CONTEXT_GLOBAL} = {context};
const invoke = (command, args) =>
  window.__TAURI_INTERNALS__.invoke(command, args).catch((error) => console.error("usemcpkit window", command, error));
window.{CLOSE_BINDING} = () => invoke("close_window");
window.{FIT_BINDING} = (size) => invoke("fit_window", {{ width: size.width, height: size.height }});
window.{OPEN_LINK_BINDING} = (url) => invoke("open_link", {{ url }});
}})();"#
    )
}
