use std::collections::BTreeMap;
use usemcpkit_core::mcp::{PARTIAL_LOADING_DISABLED, PARTIAL_LOADING_ENABLED, PARTIAL_LOADING_ENV};

/// The environment every client entry starts usemcpkit with, so the choice made at install stays visible in the config.
pub fn create_launch_env(partial_loading: bool) -> BTreeMap<String, String> {
    let value = if partial_loading {
        PARTIAL_LOADING_ENABLED
    } else {
        PARTIAL_LOADING_DISABLED
    };
    BTreeMap::from([(PARTIAL_LOADING_ENV.to_owned(), value.to_owned())])
}
