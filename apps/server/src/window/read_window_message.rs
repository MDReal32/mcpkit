use crate::window::consts::{CLOSE_BINDING, FIT_BINDING, OPEN_LINK_BINDING, WINDOW_LINK_SCHEMES};
use crate::window::form_window_event::FormWindowEvent;
use serde_json::Value;
use url::Url;

/// The event a `{ name, args }` message from the page asks for; None for anything malformed, a fit that is not a
/// `{ width, height }` in numbers, or a link that is not one http(s) URL.
pub fn read_window_message(body: &str) -> Option<FormWindowEvent> {
    let message: Value = serde_json::from_str(body).ok()?;
    let first = message.pointer("/args/0");
    match message.get("name")?.as_str()? {
        CLOSE_BINDING => Some(FormWindowEvent::Close),
        FIT_BINDING => {
            let size = first?;
            let width = size.get("width")?.as_f64()?.round();
            let height = size.get("height")?.as_f64()?.round();
            if !(0.0..=f64::from(u32::MAX)).contains(&width) || !(0.0..=f64::from(u32::MAX)).contains(&height) {
                return None;
            }
            Some(FormWindowEvent::Fit {
                width: width as u32,
                height: height as u32,
            })
        }
        OPEN_LINK_BINDING => {
            let link = Url::parse(first?.as_str()?).ok()?;
            WINDOW_LINK_SCHEMES
                .contains(&link.scheme())
                .then(|| FormWindowEvent::OpenLink(link.to_string()))
        }
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::read_window_message;
    use crate::window::form_window_event::FormWindowEvent;

    #[test]
    fn reads_close_and_fit() {
        assert_eq!(
            read_window_message(r#"{"name":"mcpkitCloseWindow","args":[]}"#),
            Some(FormWindowEvent::Close)
        );
        assert_eq!(
            read_window_message(r#"{"name":"mcpkitFitWindow","args":[{"width":520,"height":411.6}]}"#),
            Some(FormWindowEvent::Fit {
                width: 520,
                height: 412
            })
        );
        assert_eq!(
            read_window_message(r#"{"name":"mcpkitFitWindow","args":["big"]}"#),
            None
        );
    }

    #[test]
    fn opens_only_http_links() {
        assert_eq!(
            read_window_message(r#"{"name":"mcpkitOpenLink","args":["https://github.com/settings/tokens"]}"#),
            Some(FormWindowEvent::OpenLink("https://github.com/settings/tokens".into()))
        );
        assert_eq!(
            read_window_message(r#"{"name":"mcpkitOpenLink","args":["file:///etc/passwd"]}"#),
            None
        );
        assert_eq!(read_window_message(r#"{"name":"other","args":[]}"#), None);
    }
}
