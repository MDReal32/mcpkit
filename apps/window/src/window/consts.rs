pub const FORM_WINDOW_TITLE: &str = "usemcpkit";

/// The label the capability file `capabilities/form.json` grants its permissions to.
pub const FORM_WINDOW_LABEL: &str = "form";

/// The size the window opens at, before the page reports the size of its card.
pub const FORM_WINDOW_WIDTH: f64 = 520.0;

pub const FORM_WINDOW_HEIGHT: f64 = 640.0;

/// The global the page reads its launch from; core's `FORM_WINDOW_CONTEXT` holds the same name.
pub const CONTEXT_GLOBAL: &str = "usemcpkitWindow";

/// The page the app opens, a file of `apps/window/ui/build`.
pub const FORM_PAGE: &str = "usemcpkit.ui.html";

/// The page calls these by name; core's `FORM_WINDOW_BINDINGS` holds the same names.
pub const CLOSE_BINDING: &str = "usemcpkitCloseWindow";

pub const FIT_BINDING: &str = "usemcpkitFitWindow";

pub const OPEN_LINK_BINDING: &str = "usemcpkitOpenLink";

/// Links the page may hand to the default browser; nothing else leaves the window.
pub const WINDOW_LINK_SCHEMES: [&str; 2] = ["https", "http"];
