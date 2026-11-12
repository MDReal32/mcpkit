/// `url` with `{version}` replaced.
pub fn fill_version(url: &str, version: &str) -> String {
    url.replace("{version}", version)
}
