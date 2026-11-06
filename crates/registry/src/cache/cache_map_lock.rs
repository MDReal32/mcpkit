use tokio::sync::Mutex;

/// Held while `cache.json` is read, changed and written back, so loads running at the same time in this process never
/// drop each other's entries or rename the same pending file.
pub static CACHE_MAP_LOCK: Mutex<()> = Mutex::const_new(());
