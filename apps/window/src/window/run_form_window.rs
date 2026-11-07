use crate::window::commands::{close_window, fit_window, open_link};
use crate::window::consts::{FORM_PAGE, FORM_WINDOW_HEIGHT, FORM_WINDOW_LABEL, FORM_WINDOW_TITLE, FORM_WINDOW_WIDTH};
use crate::window::form_launch::FormLaunch;
use crate::window::window_binding_script::window_binding_script;
use tauri::{WebviewUrl, WebviewWindowBuilder, generate_context, generate_handler};

/// Shows the credentials page, bundled in this app, in a window (WebKit on macOS, WebView2 on Windows, WebKitGTK on
/// Linux) above other windows until it closes; the process exits with it. On macOS the process is an accessory app,
/// so no Dock icon appears and the window may show over another app's full-screen Space, and the title bar is
/// transparent so the page gets the whole requested height. The page closes the window, fits it to its card and opens
/// links through the commands of `capabilities/form.json`, since a webview has no `window.close` and no tabs.
pub fn run_form_window(launch: FormLaunch) -> Result<(), String> {
    tauri::Builder::default()
        .invoke_handler(generate_handler![
            close_window::close_window,
            fit_window::fit_window,
            open_link::open_link
        ])
        .setup(move |app| {
            #[cfg(target_os = "macos")]
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);
            let builder = WebviewWindowBuilder::new(app, FORM_WINDOW_LABEL, WebviewUrl::App(FORM_PAGE.into()));
            #[cfg(target_os = "macos")]
            let builder = builder.title_bar_style(tauri::TitleBarStyle::Transparent);
            builder
                .title(FORM_WINDOW_TITLE)
                .inner_size(FORM_WINDOW_WIDTH, FORM_WINDOW_HEIGHT)
                .always_on_top(true)
                .focused(true)
                .visible_on_all_workspaces(true)
                .initialization_script(window_binding_script(&launch))
                .build()?;
            Ok(())
        })
        .run(generate_context!())
        .map_err(|error| error.to_string())
}
