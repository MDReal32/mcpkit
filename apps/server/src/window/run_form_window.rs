use crate::browser::open_browser;
use crate::window::build_webview::build_webview;
use crate::window::consts::{FORM_WINDOW_HEIGHT, FORM_WINDOW_TITLE, FORM_WINDOW_WIDTH};
use crate::window::form_window_event::FormWindowEvent;
use crate::window::read_window_message::read_window_message;
use crate::window::window_binding_script::window_binding_script;
use tao::dpi::LogicalSize;
use tao::event::{Event, WindowEvent};
use tao::event_loop::{ControlFlow, EventLoop, EventLoopBuilder};
use tao::window::WindowBuilder;
use wry::WebViewBuilder;

/// Shows `url` in a native window (WebKit on macOS, WebView2 on Windows, WebKitGTK on Linux) above other windows until
/// it closes; the process exits with it. On macOS the process is an accessory app, so no Dock icon appears and the
/// window may show over another app's full-screen Space. The page closes the window, fits it to its card and opens
/// links through bound functions, since a webview has no `window.close` and no tabs.
pub fn run_form_window(url: &str) -> Result<(), String> {
    let mut event_loop = EventLoopBuilder::<FormWindowEvent>::with_user_event().build();
    configure_event_loop(&mut event_loop);
    let window = WindowBuilder::new()
        .with_title(FORM_WINDOW_TITLE)
        .with_inner_size(LogicalSize::new(FORM_WINDOW_WIDTH, FORM_WINDOW_HEIGHT))
        .with_always_on_top(true)
        .with_focused(true)
        .build(&event_loop)
        .map_err(|error| error.to_string())?;
    window.set_visible_on_all_workspaces(true);
    let proxy = event_loop.create_proxy();
    let builder = WebViewBuilder::new()
        .with_url(url)
        .with_initialization_script(window_binding_script())
        .with_ipc_handler(move |request| {
            if let Some(event) = read_window_message(request.body())
                && proxy.send_event(event).is_err()
            {
                eprintln!("usemcpkit: the form window closed before it handled a message");
            }
        });
    let _webview = build_webview(builder, &window).map_err(|error| error.to_string())?;
    window.set_focus();
    event_loop.run(move |event, _, control_flow| {
        *control_flow = ControlFlow::Wait;
        match event {
            Event::WindowEvent {
                event: WindowEvent::CloseRequested,
                ..
            }
            | Event::UserEvent(FormWindowEvent::Close) => *control_flow = ControlFlow::Exit,
            Event::UserEvent(FormWindowEvent::Fit { width, height }) => {
                window.set_inner_size(LogicalSize::new(width, height));
                window.set_resizable(false);
            }
            Event::UserEvent(FormWindowEvent::OpenLink(link)) => open_browser(&link),
            _ => {}
        }
    })
}

#[cfg(target_os = "macos")]
fn configure_event_loop(event_loop: &mut EventLoop<FormWindowEvent>) {
    use tao::platform::macos::{ActivationPolicy, EventLoopExtMacOS};

    event_loop.set_activation_policy(ActivationPolicy::Accessory);
}

#[cfg(not(target_os = "macos"))]
fn configure_event_loop(_event_loop: &mut EventLoop<FormWindowEvent>) {}
