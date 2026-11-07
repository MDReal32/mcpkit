use tempfile::TempDir;
use usemcpkit_servers::window_app::install_window_app;

#[test]
fn writes_the_embedded_window_program_once_and_drops_other_builds() {
    let home = TempDir::new().unwrap();
    let stale = home.path().join("window/0.0.1-stale");
    std::fs::create_dir_all(&stale).unwrap();
    std::fs::write(stale.join("usemcpkit-window"), "old").unwrap();

    let program = install_window_app(home.path()).unwrap();
    let written = std::fs::metadata(&program).unwrap().modified().unwrap();
    let again = install_window_app(home.path()).unwrap();

    assert_eq!(again, program);
    assert_eq!(std::fs::metadata(&program).unwrap().modified().unwrap(), written);
    assert!(std::fs::metadata(&program).unwrap().len() > 1_000_000);
    assert!(!stale.exists());
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        assert_eq!(std::fs::metadata(&program).unwrap().permissions().mode() & 0o111, 0o111);
    }
}
