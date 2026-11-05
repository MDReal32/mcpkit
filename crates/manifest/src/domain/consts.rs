pub const DOMAIN_PLACEHOLDER: &str = "{domain}";

/// What a path segment of a domain value may hold besides letters and digits.
pub const DOMAIN_PATH_CHARACTERS: &str = "._~-";

/// Hosts a `domain.loopbackHttp` server reaches over `http://`.
pub const LOOPBACK_HOSTS: [&str; 2] = ["localhost", "127.0.0.1"];

pub const HTTPS_PREFIX: &str = "https://";

pub const HTTP_PREFIX: &str = "http://";
