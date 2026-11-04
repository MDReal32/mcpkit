use crate::upstream_error::UpstreamError;
use usemcpkit_core::js::to_js_json;
use usemcpkit_manifest::upstream::UpstreamRepo;

/// `JSON.stringify(repo)`, byte for byte what TypeScript keeps in the marker, so a clone it made is not rebuilt.
pub fn repo_signature(repo: &UpstreamRepo) -> Result<String, UpstreamError> {
    serde_json::to_value(repo)
        .map(|value| to_js_json(&value))
        .map_err(|error| UpstreamError::new(format!("cannot describe the repository {}: {error}", repo.url)))
}

#[cfg(test)]
mod tests {
    use super::repo_signature;
    use usemcpkit_manifest::upstream::UpstreamRepo;

    /// What `JSON.stringify` gave for the Bitwarden and Teams manifests' `repo`.
    const TYPESCRIPT_SIGNATURES: [&str; 2] = [
        r#"{"url":"https://github.com/bitwarden/mcp-server.git","ref":"4fd2b49c617e11773c93edf8937b2e27f40a89da","setup":[{"command":"npm","args":["ci","--ignore-scripts"]},{"command":"npm","args":["run","build"]}]}"#,
        r#"{"url":"https://github.com/InditexTech/mcp-teams-server.git","ref":"f6281411ff90f9dcbfd9845a7192215672884d89","setup":[{"command":"uv","args":["sync","--managed-python","--frozen","--no-dev","--project","."]}]}"#,
    ];

    #[test]
    fn writes_the_signature_typescript_writes() {
        for signature in TYPESCRIPT_SIGNATURES {
            let repo: UpstreamRepo = serde_json::from_str(signature).unwrap();

            assert_eq!(repo_signature(&repo).unwrap(), signature);
        }
        let bare: UpstreamRepo = serde_json::from_str(r#"{"url":"u","ref":"main"}"#).unwrap();
        assert_eq!(repo_signature(&bare).unwrap(), r#"{"url":"u","ref":"main"}"#);
    }
}
