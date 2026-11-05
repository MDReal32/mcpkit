pub const FORM_WINDOW_TITLE: &str = "usemcpkit";

/// The size the window opens at, before the page reports the size of its card.
pub const FORM_WINDOW_WIDTH: f64 = 520.0;

pub const FORM_WINDOW_HEIGHT: f64 = 640.0;

/// The page calls these by name; core's `FORM_WINDOW_BINDINGS` holds the same names.
pub const CLOSE_BINDING: &str = "usemcpkitCloseWindow";

pub const FIT_BINDING: &str = "usemcpkitFitWindow";

pub const OPEN_LINK_BINDING: &str = "usemcpkitOpenLink";

/// Links the page may hand to the default browser; nothing else leaves the window.
pub const WINDOW_LINK_SCHEMES: [&str; 2] = ["https", "http"];
