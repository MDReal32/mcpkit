use crate::window::consts::{CLOSE_BINDING, FIT_BINDING, OPEN_LINK_BINDING};

/// Defines the page's window functions; each posts `{ name, args }` to the window over wry's IPC channel.
pub fn window_binding_script() -> String {
    let bindings = [CLOSE_BINDING, FIT_BINDING, OPEN_LINK_BINDING]
        .map(|name| {
            format!(
                "window.{name} = (...args) => window.ipc.postMessage(JSON.stringify({{ name: \"{name}\", args }}));"
            )
        })
        .join("\n");
    format!("(() => {{\n{bindings}\n}})();")
}
