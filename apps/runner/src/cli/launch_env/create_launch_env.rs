use std::collections::BTreeMap;
use usemcpkit_core::mcp::{PARTIAL_LOADING_DISABLED, PARTIAL_LOADING_ENABLED, PARTIAL_LOADING_ENV};
use usemcpkit_core::update::{AUTO_UPDATE_DISABLED, AUTO_UPDATE_ENABLED, AUTO_UPDATE_ENV};

/// The environment every client entry starts usemcpkit with, so the choices made at install stay visible in the config.
pub fn create_launch_env(partial_loading: bool, auto_update: bool) -> BTreeMap<String, String> {
    let partial_loading = if partial_loading {
        PARTIAL_LOADING_ENABLED
    } else {
        PARTIAL_LOADING_DISABLED
    };
    let auto_update = if auto_update {
        AUTO_UPDATE_ENABLED
    } else {
        AUTO_UPDATE_DISABLED
    };
    BTreeMap::from([
        (PARTIAL_LOADING_ENV.to_owned(), partial_loading.to_owned()),
        (AUTO_UPDATE_ENV.to_owned(), auto_update.to_owned()),
    ])
}
