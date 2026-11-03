/// The Svelte credentials page, built by `packages/ui` into one HTML file with an empty request element.
pub const CREDENTIALS_FORM_PAGE: &str = include_str!(concat!(
    env!("CARGO_MANIFEST_DIR"),
    "/../../packages/ui/build/mcpkit.ui.html"
));
