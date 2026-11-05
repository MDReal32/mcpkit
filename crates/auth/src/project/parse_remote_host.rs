use crate::project::read_scp_host::read_scp_host;
use url::Url;

/// The host of a git remote URL (https, ssh or scp-like `git@host:path`), lowercase and without a port.
pub fn parse_remote_host(remote: &str) -> Option<String> {
    if remote.contains("://") {
        let url = Url::parse(remote).ok()?;
        return url.host_str().filter(|host| !host.is_empty()).map(str::to_lowercase);
    }
    let after_user = remote
        .find(['@', '/'])
        .filter(|&index| index > 0 && remote[index..].starts_with('@'))
        .and_then(|index| read_scp_host(&remote[index + 1..]));
    after_user.or_else(|| read_scp_host(remote)).map(str::to_lowercase)
}

#[cfg(test)]
mod tests {
    use super::parse_remote_host;

    #[test]
    fn reads_https_ssh_and_scp_like_remotes() {
        assert_eq!(
            parse_remote_host("https://GitHub.com/a/b.git").as_deref(),
            Some("github.com")
        );
        assert_eq!(
            parse_remote_host("ssh://git@gitlab.example:22/a/b.git").as_deref(),
            Some("gitlab.example")
        );
        assert_eq!(
            parse_remote_host("git@gitlab.B.example:team/app.git").as_deref(),
            Some("gitlab.b.example")
        );
        assert_eq!(
            parse_remote_host("host.example:team/app.git").as_deref(),
            Some("host.example")
        );
        assert_eq!(parse_remote_host("/srv/repos/app.git"), None);
        assert_eq!(parse_remote_host("../app"), None);
        assert_eq!(parse_remote_host("https://"), None);
    }
}
