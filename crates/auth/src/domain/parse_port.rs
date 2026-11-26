/// A port number from text; zero and anything that is not 1 to 65535 in digits is none.
pub fn parse_port(text: &str) -> Option<u16> {
    if text.is_empty() || !text.chars().all(|digit| digit.is_ascii_digit()) {
        return None;
    }
    text.parse::<u16>().ok().filter(|port| *port > 0)
}

#[cfg(test)]
mod tests {
    use super::parse_port;

    #[test]
    fn accepts_only_a_port_in_range() {
        assert_eq!(parse_port("64542"), Some(64542));
        assert_eq!(parse_port("65535"), Some(65535));
        for text in ["", "0", "65536", "-1", "80a", " 80"] {
            assert_eq!(parse_port(text), None, "{text}");
        }
    }
}
