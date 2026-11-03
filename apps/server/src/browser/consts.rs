/// The Svelte credentials page, built by `packages/ui` into one HTML file with an empty request element.
pub const CREDENTIALS_FORM_PAGE: &str = include_str!(concat!(
    env!("CARGO_MANIFEST_DIR"),
    "/../../packages/ui/build/mcpkit.ui.html"
));

/// Keeps the window process from opening a console window of its own on Windows.
#[cfg(windows)]
pub const CREATE_NO_WINDOW: u32 = 0x0800_0000;
