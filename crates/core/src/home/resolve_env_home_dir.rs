use crate::env::Env;
use crate::home::consts::HOME_ENV;
use crate::home::resolve_home_dir::resolve_home_dir;
use std::path::PathBuf;

/// The mcpkit home folder for the variables of a call.
pub fn resolve_env_home_dir(env: &Env) -> Result<PathBuf, String> {
    resolve_home_dir(env.get(HOME_ENV).map(Into::into))
}
