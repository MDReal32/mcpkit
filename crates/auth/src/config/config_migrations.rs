use crate::config::migrations::{
    drop_last_used_domain, group_servers, migrate_servers, move_secrets_under_host, to_legacy_category,
};
use usemcpkit_core::migrations::{FIRST_VERSION, Migration};

/// One entry per version bump, in order; the version of the config file is the list length plus one.
pub const CONFIG_MIGRATIONS: &[Migration] = &[
    |data| migrate_servers(data, move_secrets_under_host),
    |data| migrate_servers(data, drop_last_used_domain),
    |data| group_servers(data, to_legacy_category),
];

pub const CONFIG_VERSION: i64 = FIRST_VERSION + CONFIG_MIGRATIONS.len() as i64;
