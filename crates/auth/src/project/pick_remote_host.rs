use crate::ui::to_web_host;

/// The known host a git remote host points at: `github.com` picks `api.github.com`, a self-managed host picks itself.
pub fn pick_remote_host<'a>(known_hosts: &'a [String], remote_host: &str) -> Option<&'a String> {
    let to_hostname = |domain: &str| {
        let host = domain.split('/').next().unwrap_or(domain);
        host.split(':').next().unwrap_or(host).to_lowercase()
    };
    known_hosts
        .iter()
        .find(|host| to_hostname(host) == remote_host || to_hostname(to_web_host(host)) == remote_host)
}

#[cfg(test)]
mod tests {
    use super::pick_remote_host;

    #[test]
    fn matches_the_host_or_its_web_host() {
        let hosts = vec!["api.github.com".to_owned(), "GHE.example.com:8443/api/v3".to_owned()];

        assert_eq!(pick_remote_host(&hosts, "github.com"), Some(&hosts[0]));
        assert_eq!(pick_remote_host(&hosts, "ghe.example.com"), Some(&hosts[1]));
        assert_eq!(pick_remote_host(&hosts, "other.example"), None);
    }
}
