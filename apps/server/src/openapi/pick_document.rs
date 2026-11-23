use usemcpkit_openapi::version::{oldest_version, pick_version};

/// The newest document not newer than `version`; the oldest one when `falls_back` and none is old enough or the
/// version is unknown.
pub fn pick_document<'a>(
    version: Option<&str>,
    available: impl Iterator<Item = &'a str> + Clone,
    falls_back: bool,
) -> Option<&'a str> {
    let picked = version.and_then(|version| pick_version(version, available.clone()));
    if picked.is_none() && falls_back {
        return oldest_version(available);
    }
    picked
}
