/// The host at the start of an scp-like remote, `host:path`: the text up to the first `:` or `/`, which must be a `:`
/// that does not start `://`.
pub fn read_scp_host(remote: &str) -> Option<&str> {
    let end = remote.find([':', '/']).filter(|&end| end > 0)?;
    let rest = &remote[end..];
    if !rest.starts_with(':') || rest[1..].starts_with("//") {
        return None;
    }
    Some(&remote[..end])
}
