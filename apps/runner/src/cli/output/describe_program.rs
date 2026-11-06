use usemcpkit_binary::NPM_REGISTRY_ENV;
use usemcpkit_clients::CLIENT_DEFINITIONS;
use usemcpkit_core::home::HOME_ENV;
use usemcpkit_core::mcp::PARTIAL_LOADING_ENV;
use usemcpkit_core::update::AUTO_UPDATE_ENV;
use usemcpkit_registry::REGISTRY_ENV;

/// The help text after the commands: the clients usemcpkit knows and the variables it reads.
pub fn describe_program() -> String {
    let clients: Vec<&str> = CLIENT_DEFINITIONS.iter().map(|definition| definition.id).collect();
    format!(
        "Clients: {}

Environment:
- {HOME_ENV}: config dir with bin/, manifests/, tokens.json and config.json (domains and saved credentials) (default ~/.usemcpkit)
- {REGISTRY_ENV}: manifest registry base URL used by \"update\"
- {AUTO_UPDATE_ENV}=0: stop \"serve\" from updating the installed binary (checked once a day) and \"install\"/\"serve\" from scheduling \"usemcpkit upgrade\" every few hours
- {NPM_REGISTRY_ENV}: npm registry for binary downloads (default https://registry.npmjs.org)
- {PARTIAL_LOADING_ENV}=1: beta, \"serve\" lists one section per server and loads its tools when the model opens it (\"install\" asks and writes 0 or 1 into each entry); otherwise every tool is listed from the start",
        clients.join(", ")
    )
}
