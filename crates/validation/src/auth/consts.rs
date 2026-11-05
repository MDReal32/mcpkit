/// The keys each auth type needs as strings, like core's `AUTH_REQUIRED_KEYS`.
pub const AUTH_REQUIRED_KEYS: &[(&str, &[&str])] = &[
    ("none", &[]),
    ("bearer", &["env"]),
    ("header", &["env", "name"]),
    ("query", &["env", "name"]),
    ("basic", &["usernameEnv", "passwordEnv"]),
    ("oauth", &["authorizationUrl", "tokenUrl", "clientId"]),
];
