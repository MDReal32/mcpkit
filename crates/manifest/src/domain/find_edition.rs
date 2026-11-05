use crate::EditionSpec;
use crate::domain::domain_host::domain_host;
use indexmap::IndexMap;

/// The first edition one of whose host suffixes the domain's host ends with.
pub fn find_edition<'a>(editions: Option<&'a IndexMap<String, EditionSpec>>, domain: &str) -> Option<&'a str> {
    let host = domain_host(domain);
    editions?
        .iter()
        .find(|(_, edition)| {
            edition
                .hosts
                .iter()
                .any(|suffix| host.ends_with(&suffix.to_lowercase()))
        })
        .map(|(name, _)| name.as_str())
}
