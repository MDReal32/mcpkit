use tao::window::Window;
use wry::{WebView, WebViewBuilder};

#[cfg(not(any(target_os = "linux", target_os = "freebsd")))]
pub fn build_webview(builder: WebViewBuilder, window: &Window) -> wry::Result<WebView> {
    builder.build(window)
}

/// WebKitGTK needs a GTK container, which tao's Linux window provides.
#[cfg(any(target_os = "linux", target_os = "freebsd"))]
pub fn build_webview(builder: WebViewBuilder, window: &Window) -> wry::Result<WebView> {
    use tao::platform::unix::WindowExtUnix;
    use wry::WebViewBuilderExtUnix;

    match window.default_vbox() {
        Some(container) => builder.build_gtk(container),
        None => builder.build(window),
    }
}
