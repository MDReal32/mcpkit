use tokio::sync::Mutex;

/// Held around every read-modify-write of the config file, so concurrent saves never lose each other's changes.
pub static CONFIG_LOCK: Mutex<()> = Mutex::const_new(());
