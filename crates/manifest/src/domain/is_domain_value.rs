use crate::domain::consts::DOMAIN_PATH_CHARACTERS;

/// `host[:port][/path]`, for example `ghe.example.com/api/v3`, like the TypeScript `DOMAIN_VALUE_PATTERN`
/// `^[a-z0-9]([a-z0-9.-]*[a-z0-9])?(:\d{1,5})?(\/[a-z0-9._~-]+)*$` without regard to case.
pub fn is_domain_value(value: &str) -> bool {
    let (authority, path) = match value.split_once('/') {
        Some((authority, path)) => (authority, Some(path)),
        None => (value, None),
    };
    let (host, port) = match authority.split_once(':') {
        Some((host, port)) => (host, Some(port)),
        None => (authority, None),
    };
    let host_is_valid = host.starts_with(|first: char| first.is_ascii_alphanumeric())
        && host.ends_with(|last: char| last.is_ascii_alphanumeric())
        && host
            .chars()
            .all(|character| character.is_ascii_alphanumeric() || character == '.' || character == '-');
    let port_is_valid =
        port.is_none_or(|port| (1..=5).contains(&port.len()) && port.chars().all(|digit| digit.is_ascii_digit()));
    let path_is_valid = path.is_none_or(|path| {
        path.split('/').all(|segment| {
            !segment.is_empty()
                && segment
                    .chars()
                    .all(|character| character.is_ascii_alphanumeric() || DOMAIN_PATH_CHARACTERS.contains(character))
        })
    });
    host_is_valid && port_is_valid && path_is_valid
}

#[cfg(test)]
mod tests {
    use super::is_domain_value;

    #[test]
    fn accepts_a_host_with_an_optional_port_and_path() {
        for value in [
            "a",
            "api.github.com",
            "ghe.example.com/api/v3",
            "Jira.Example.com:8443/jira",
            "h:1/x_y~z",
        ] {
            assert!(is_domain_value(value), "{value}");
        }
    }

    #[test]
    fn rejects_anything_else() {
        for value in [
            "",
            "-a",
            "a-",
            "a:",
            "a:123456",
            "a/",
            "a//b",
            "https://a",
            "a b",
            "a?b",
            "é.com",
            ":80",
        ] {
            assert!(!is_domain_value(value), "{value}");
        }
    }
}
