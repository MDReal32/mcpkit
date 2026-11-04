use crate::cache::cache_map::CacheMap;
use crate::cache::parse_cache_map::parse_cache_map;
use crate::consts::CACHE_FILE_NAME;
use crate::registry_context::RegistryContext;
use std::io::ErrorKind;

/// The map only describes the cached files, which are checked against their hashes anyway: an unreadable one is rebuilt.
pub async fn read_cache_map<F>(context: &RegistryContext<F>) -> CacheMap {
    let file = context.dir.join(CACHE_FILE_NAME);
    let parsed = match tokio::fs::read_to_string(&file).await {
        Ok(text) => parse_cache_map(&text),
        Err(error) if error.kind() == ErrorKind::NotFound => return CacheMap::new(),
        Err(error) => Err(error.to_string()),
    };
    parsed.unwrap_or_else(|error| {
        (context.warn)(&format!(
            "usemcpkit: {} is unreadable and will be rebuilt: {error}",
            file.display()
        ));
        CacheMap::new()
    })
}
