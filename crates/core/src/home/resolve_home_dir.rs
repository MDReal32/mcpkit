use crate::home::consts::{HOME_DIR_NAME, HOME_ENV};
use std::ffi::OsString;
use std::path::PathBuf;

/// `USEMCPKIT_HOME` when it is set, even to an empty value like the TypeScript `??`, otherwise `~/.usemcpkit`.
pub fn resolve_home_dir(env_value: Option<OsString>) -> Result<PathBuf, String> {
    if let Some(value) = env_value {
        return Ok(PathBuf::from(value));
    }
    std::env::home_dir()
        .map(|home| home.join(HOME_DIR_NAME))
        .ok_or_else(|| format!("cannot find the home folder; set {HOME_ENV}"))
}

#[cfg(test)]
mod tests {
    use super::resolve_home_dir;
    use std::path::PathBuf;

    #[test]
    fn prefers_the_env_value() {
        assert_eq!(
            resolve_home_dir(Some("/data/usemcpkit".into())),
            Ok(PathBuf::from("/data/usemcpkit"))
        );
    }

    #[test]
    fn falls_back_to_the_user_home() {
        let home = resolve_home_dir(None).expect("a home folder");
        assert!(home.ends_with(".usemcpkit"));
    }
}
