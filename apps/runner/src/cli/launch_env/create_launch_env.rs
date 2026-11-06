use std::collections::BTreeMap;
use usemcpkit_core::update::{AUTO_UPDATE_DISABLED, AUTO_UPDATE_ENABLED, AUTO_UPDATE_ENV};

/// The environment every client entry starts usemcpkit with, so the choice made at install stays visible in the config.
pub fn create_launch_env(auto_update: bool) -> BTreeMap<String, String> {
    let auto_update = if auto_update {
        AUTO_UPDATE_ENABLED
    } else {
        AUTO_UPDATE_DISABLED
    };
    BTreeMap::from([(AUTO_UPDATE_ENV.to_owned(), auto_update.to_owned())])
}
