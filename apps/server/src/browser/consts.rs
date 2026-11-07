/// The Svelte credentials page, built by `apps/window/ui` into one HTML file with an empty request element.
pub const CREDENTIALS_FORM_PAGE: &str = include_str!(concat!(
    env!("CARGO_MANIFEST_DIR"),
    "/../window/ui/build/usemcpkit.ui.html"
));
