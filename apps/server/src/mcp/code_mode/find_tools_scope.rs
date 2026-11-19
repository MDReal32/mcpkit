use crate::mcp::code_mode::tools_scope::ToolsScope;
use crate::mcp::consts::TOOL_ID_SEPARATOR;
use usemcpkit_manifest::registry::RegistryServer;

/// Reads the query of `codemode.tools`: a server id, or the start of a tool id (`git:gitlab:api/v4/web_commits`),
/// which names the server with the longest id it starts with followed by `:`, and the start of the tool names after it.
pub fn find_tools_scope<'a>(servers: &'a [RegistryServer], query: &'a str) -> Result<ToolsScope<'a>, String> {
    if let Some(server) = servers.iter().find(|server| server.id == query) {
        return Ok(ToolsScope { server, prefix: None });
    }
    servers
        .iter()
        .filter_map(|server| {
            let prefix = query
                .strip_prefix(server.id.as_str())?
                .strip_prefix(TOOL_ID_SEPARATOR)?;
            Some(ToolsScope {
                server,
                prefix: Some(prefix),
            })
        })
        .max_by_key(|scope| scope.server.id.len())
        .ok_or_else(|| format!("unknown server \"{query}\": pass a server id or the start of a tool id"))
}

#[cfg(test)]
mod tests {
    use super::find_tools_scope;
    use usemcpkit_manifest::registry::RegistryServer;

    fn server(id: &str) -> RegistryServer {
        RegistryServer {
            id: id.into(),
            version: "1.0.0".into(),
            url: format!("{id}.json"),
            sha256: String::new(),
            description: None,
            upstream: false,
            openapi: false,
            disabled: false,
        }
    }

    #[test]
    fn reads_a_server_id_as_every_tool_of_it() {
        let servers = [server("git:gitlab")];

        let scope = find_tools_scope(&servers, "git:gitlab").unwrap();

        assert_eq!(scope.server.id, "git:gitlab");
        assert_eq!(scope.prefix, None);
    }

    #[test]
    fn reads_the_start_of_a_tool_id_as_its_server_and_a_name_prefix() {
        let servers = [server("git:github"), server("git:gitlab")];

        let scope = find_tools_scope(&servers, "git:gitlab:api/v4/web_commits").unwrap();

        assert_eq!(scope.server.id, "git:gitlab");
        assert_eq!(scope.prefix, Some("api/v4/web_commits"));
    }

    #[test]
    fn picks_the_longest_server_id_the_query_starts_with() {
        let servers = [server("test:a"), server("test:a:b")];

        let scope = find_tools_scope(&servers, "test:a:b:c").unwrap();

        assert_eq!(scope.server.id, "test:a:b");
        assert_eq!(scope.prefix, Some("c"));
    }

    #[test]
    fn refuses_a_query_that_names_no_server() {
        let servers = [server("git:gitlab")];

        let error = find_tools_scope(&servers, "git:git").err().unwrap();

        assert_eq!(
            error,
            "unknown server \"git:git\": pass a server id or the start of a tool id"
        );
    }
}
