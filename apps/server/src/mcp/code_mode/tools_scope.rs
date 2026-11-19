use usemcpkit_manifest::registry::RegistryServer;

/// What `codemode.tools(query)` lists: the tools of `server` whose names start with `prefix`, every one of them when
/// there is no prefix.
pub struct ToolsScope<'a> {
    pub server: &'a RegistryServer,
    pub prefix: Option<&'a str>,
}
