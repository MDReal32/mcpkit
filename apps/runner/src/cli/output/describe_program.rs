use mcpkit_binary::NPM_REGISTRY_ENV;
use mcpkit_clients::CLIENT_DEFINITIONS;
use mcpkit_core::home::HOME_ENV;
use mcpkit_core::update::AUTO_UPDATE_ENV;
use mcpkit_registry::REGISTRY_ENV;

/// The help text after the commands: the clients mcpkit knows and the variables it reads.
pub fn describe_program() -> String {
    let clients: Vec<&str> = CLIENT_DEFINITIONS.iter().map(|definition| definition.id).collect();
    format!(
        "Clients: {}

Environment:
- {HOME_ENV}: config dir with bin/, manifests/, tokens.json and config.json (domains and saved credentials) (default ~/.mcpkit)
- {REGISTRY_ENV}: manifest registry base URL used by \"update\"
- {AUTO_UPDATE_ENV}=0: stop \"serve\" from updating the installed binary (checked once a day) and \"install\"/\"serve\" from scheduling \"mcpkit upgrade\" every few hours
- {NPM_REGISTRY_ENV}: npm registry for binary downloads (default https://registry.npmjs.org)",
        clients.join(", ")
    )
}
