use crate::openapi::spec_choice::SpecChoice;
use serde_json::Value;
use std::cmp::Ordering;
use usemcpkit_manifest::openapi::OpenApiSource;
use usemcpkit_openapi::version::{compare_versions, fill_version, pick_version, read_version_list};
use usemcpkit_registry::{Fetch, RegistryContext, resolve_registry_link};

/// The document of `version`, or of the nearest older version the source's `known` table or version list has; the url
/// as is for a source without versions. `None` when no document is published for that version or an older one.
pub async fn choose_spec<F: Fetch>(
    source: &OpenApiSource,
    version: Option<&str>,
    context: &RegistryContext<F>,
) -> Result<Option<SpecChoice>, String> {
    let resolve = |link: &str| resolve_registry_link(&context.registry_url, link).map_err(|error| error.to_string());
    let (versioning, version) = match (&source.version, version) {
        (None, _) => {
            return Ok(Some(SpecChoice {
                url: resolve(&source.url)?,
                spec_version: None,
            }));
        }
        (Some(_), None) => return Err(format!("the version of the {} server is unknown", source.name)),
        (Some(versioning), Some(version)) => (versioning, version),
    };
    let (picked, token) = if let Some(known) = &versioning.known {
        let Some(picked) = pick_version(version, known.keys().map(String::as_str)) else {
            return Ok(None);
        };
        let Some(token) = known.get(picked) else {
            return Ok(None);
        };
        (picked.to_owned(), token.clone())
    } else if let Some(list) = &versioning.list {
        let text = context
            .fetcher
            .fetch_text(&resolve(&list.url)?)
            .await
            .map_err(|error| error.to_string())?;
        let answer: Value = serde_json::from_str(&text)
            .map_err(|error| format!("the version list {} is not JSON: {error}", list.url))?;
        let available = read_version_list(&answer, list).map_err(|error| error.0)?;
        let Some(picked) = pick_version(version, available.iter().map(String::as_str)) else {
            return Ok(None);
        };
        (picked.to_owned(), picked.to_owned())
    } else {
        (version.to_owned(), version.to_owned())
    };
    let spec_version = if compare_versions(&picked, version) == Ordering::Equal {
        version.to_owned()
    } else {
        picked
    };
    Ok(Some(SpecChoice {
        url: resolve(&fill_version(&source.url, &token))?,
        spec_version: Some(spec_version),
    }))
}
