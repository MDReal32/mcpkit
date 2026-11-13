use crate::openapi::write_cache_file::write_cache_file;
use serde_json::Value;
use std::path::Path;
use usemcpkit_core::hash::sha256_hex;
use usemcpkit_openapi::document::{parse_document, to_yaml};
use usemcpkit_registry::Fetch;

/// The OpenAPI 3 document at `url` (a Swagger 2.0 one upgraded), checked against the manifest's sha256 when it gives
/// one and saved as YAML to `file`.
pub async fn download_spec<F: Fetch>(
    url: &str,
    sha256: Option<&str>,
    file: &Path,
    fetcher: &F,
) -> Result<Value, String> {
    let text = fetcher.fetch_text(url).await.map_err(|error| error.to_string())?;
    if let Some(expected) = sha256
        && sha256_hex(&text) != expected
    {
        return Err(format!("{url} does not match the sha256 of the manifest"));
    }
    let document = parse_document(&text).map_err(|error| format!("{url}: {}", error.0))?;
    let yaml = to_yaml(&document).map_err(|error| error.0)?;
    write_cache_file(file, &yaml).await?;
    Ok(document)
}
