use crate::window::form_launch::FormLaunch;
use crate::window::parse_form_url::parse_form_url;
use serde_json::Value;
use std::io::Read;

/// The launch for `url` and the request JSON the server wrote to `input` before closing it.
pub fn read_form_launch(url: &str, mut input: impl Read) -> Result<FormLaunch, String> {
    let (api, session) = parse_form_url(url)?;
    let mut text = String::new();
    input
        .read_to_string(&mut text)
        .map_err(|error| format!("cannot read the request: {error}"))?;
    let request: Value = serde_json::from_str(&text).map_err(|error| format!("the request is not JSON: {error}"))?;
    Ok(FormLaunch { api, session, request })
}

#[cfg(test)]
mod tests {
    use super::read_form_launch;
    use serde_json::json;

    #[test]
    fn reads_the_request_from_the_input() {
        let launch = read_form_launch("http://127.0.0.1:9/#t", r#"{"serverName":"demo"}"#.as_bytes()).unwrap();
        assert_eq!(launch.api, "http://127.0.0.1:9");
        assert_eq!(launch.session, "t");
        assert_eq!(launch.request, json!({ "serverName": "demo" }));
    }

    #[test]
    fn refuses_an_input_that_is_not_json() {
        assert!(read_form_launch("http://127.0.0.1:9/#t", "".as_bytes()).is_err());
    }
}
