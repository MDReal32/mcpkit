use crate::js::consts::URI_COMPONENT;
use percent_encoding::utf8_percent_encode;

pub fn encode_uri_component(value: &str) -> String {
    utf8_percent_encode(value, URI_COMPONENT).to_string()
}

#[cfg(test)]
mod tests {
    use super::encode_uri_component;

    #[test]
    fn escapes_like_javascript() {
        assert_eq!(encode_uri_component("a b/é'()*!~,?#"), "a%20b%2F%C3%A9'()*!~%2C%3F%23");
    }
}
