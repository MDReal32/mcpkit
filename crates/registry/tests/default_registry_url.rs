use std::fs;
use std::path::Path;
use usemcpkit_registry::{DEFAULT_REGISTRY_URL, REGISTRY_ENV, REGISTRY_VERSION_DIR, resolve_registry_url};

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

#[test]
fn reads_the_folder_published_for_this_version_unless_a_registry_is_named() {
    assert_eq!(REGISTRY_VERSION_DIR, format!("v{}", env!("CARGO_PKG_VERSION")));
    assert_eq!(resolve_registry_url(Some("https://reg.example")), "https://reg.example");
    if std::env::var_os(REGISTRY_ENV).is_none() {
        assert_eq!(
            resolve_registry_url(None),
            format!("{DEFAULT_REGISTRY_URL}/{REGISTRY_VERSION_DIR}")
        );
    }
}
