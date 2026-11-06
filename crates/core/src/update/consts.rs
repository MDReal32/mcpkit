/// `0` keeps the installed binary and every repository-backed upstream where they are: no self-update, no scheduled
/// upgrade (a job already scheduled is removed) and no pull of a cloned upstream. Unset or `1` keeps them current.
pub const AUTO_UPDATE_ENV: &str = "USEMCPKIT_AUTOUPDATE";

pub const AUTO_UPDATE_ENABLED: &str = "1";

pub const AUTO_UPDATE_DISABLED: &str = "0";
