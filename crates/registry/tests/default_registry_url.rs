use mcpkit_registry::DEFAULT_REGISTRY_URL;
use std::fs;
use std::path::Path;

#[test]
fn matches_the_url_packages_servers_publishes_to() {
    let source = Path::new(env!("CARGO_MANIFEST_DIR")).join("../../packages/servers/src/const.ts");
    let text = fs::read_to_string(&source).expect("packages/servers/src/const.ts");
    assert!(
        text.contains(&format!("DEFAULT_REGISTRY_URL = \"{DEFAULT_REGISTRY_URL}\"")),
        "{} names another registry URL",
        source.display()
    );
}
