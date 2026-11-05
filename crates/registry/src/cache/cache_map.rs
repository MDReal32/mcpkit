use crate::cache::cache_entry::CacheEntry;
use indexmap::IndexMap;

/// Cached files by their path inside the registry folder, for example `git/github/issues.json`, in the order first noted.
pub type CacheMap = IndexMap<String, CacheEntry>;
