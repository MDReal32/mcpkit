use crate::env::Env;
use crate::update::consts::{AUTO_UPDATE_DISABLED, AUTO_UPDATE_ENV};

/// Auto-update is on unless `USEMCPKIT_AUTOUPDATE` is `0`.
pub fn is_auto_update_enabled(env: &Env) -> bool {
    env.get(AUTO_UPDATE_ENV) != Some(AUTO_UPDATE_DISABLED)
}
