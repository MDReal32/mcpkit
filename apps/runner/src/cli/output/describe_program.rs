use usemcpkit_binary::NPM_REGISTRY_ENV;
use usemcpkit_clients::CLIENT_DEFINITIONS;
use usemcpkit_core::home::HOME_ENV;
use usemcpkit_core::update::AUTO_UPDATE_ENV;
use usemcpkit_registry::{DEFAULT_REGISTRY_URL, REGISTRY_ENV, REGISTRY_VERSION_DIR};

/// The help text after the commands: the clients usemcpkit knows and the variables it reads.
pub fn describe_program() -> String {
    let clients: Vec<&str> = CLIENT_DEFINITIONS.iter().map(|definition| definition.id).collect();
    format!(
        "Clients: {}

Environment:
- {HOME_ENV}: config dir with bin/, manifests/, tokens.json and config.json (domains and saved credentials) (default ~/.usemcpkit)
- {REGISTRY_ENV}: manifest registry folder (default: the folder published for this version, {DEFAULT_REGISTRY_URL}/{REGISTRY_VERSION_DIR})
- {AUTO_UPDATE_ENV}=0: stop \"serve\" from updating the installed binary (checked once a day) and remove the \"usemcpkit upgrade\" scheduled every few hours; 1 or unset schedules it again (\"install\" asks and writes 0 or 1 into each entry)
- {NPM_REGISTRY_ENV}: npm registry for binary downloads (default https://registry.npmjs.org)",
        clients.join(", ")
    )
}
