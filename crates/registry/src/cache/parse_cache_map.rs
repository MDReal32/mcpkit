use crate::cache::cache_entry::CacheEntry;
use crate::cache::cache_map::CacheMap;
use crate::ids::is_sha256;
use serde_json::Value;

pub fn parse_cache_map(text: &str) -> Result<CacheMap, String> {
    let body: Value = serde_json::from_str(text).map_err(|error| error.to_string())?;
    let Value::Object(entries) = body else {
        return Err("the cache map must be an object".into());
    };
    let mut map = CacheMap::new();
    for (path, entry) in entries {
        match serde_json::from_value::<CacheEntry>(entry) {
            Ok(entry) if is_sha256(&entry.sha256) => {
                map.insert(path, entry);
            }
            _ => return Err(format!("the cache map entry of {path} is invalid")),
        }
    }
    Ok(map)
}
