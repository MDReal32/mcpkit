use usemcpkit_core::migrations::{FIRST_VERSION, Migration};

/// One entry per version bump, in order; the version of the config file is the list length plus one. The list stays
/// empty until the 1.0 release: until then the format of version 1 changes in place and an older file is not read.
pub const CONFIG_MIGRATIONS: &[Migration] = &[];

pub const CONFIG_VERSION: i64 = FIRST_VERSION + CONFIG_MIGRATIONS.len() as i64;
