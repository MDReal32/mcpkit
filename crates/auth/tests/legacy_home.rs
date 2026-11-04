use std::fs;
use tempfile::TempDir;
use usemcpkit_auth::config::adopt_legacy_home;

#[tokio::test]
async fn copies_the_saved_credentials_of_the_old_mcpkit_home_once() {
    let root = TempDir::new().unwrap();
    let legacy = root.path().join(".mcpkit");
    let home = root.path().join(".usemcpkit");
    fs::create_dir(&legacy).unwrap();
    fs::write(legacy.join("config.json"), "{\"version\": 3}\n").unwrap();
    fs::write(legacy.join("tokens.json"), "{}\n").unwrap();

    assert!(adopt_legacy_home(&home, &legacy).await.unwrap());
    assert_eq!(
        fs::read_to_string(home.join("config.json")).unwrap(),
        "{\"version\": 3}\n"
    );
    assert_eq!(fs::read_to_string(home.join("tokens.json")).unwrap(), "{}\n");
    assert!(!home.join("secrets.json").exists());
    assert!(legacy.join("config.json").exists());

    fs::write(legacy.join("config.json"), "{\"version\": 4}\n").unwrap();
    assert!(!adopt_legacy_home(&home, &legacy).await.unwrap());
    assert_eq!(
        fs::read_to_string(home.join("config.json")).unwrap(),
        "{\"version\": 3}\n"
    );
}

#[tokio::test]
async fn leaves_a_home_that_already_saved_something_alone() {
    let root = TempDir::new().unwrap();
    let legacy = root.path().join(".mcpkit");
    let home = root.path().join(".usemcpkit");
    fs::create_dir_all(&legacy).unwrap();
    fs::create_dir_all(&home).unwrap();
    fs::write(legacy.join("config.json"), "{\"old\": true}\n").unwrap();
    fs::write(home.join("secrets.json"), "{}\n").unwrap();

    assert!(!adopt_legacy_home(&home, &legacy).await.unwrap());
    assert!(!home.join("config.json").exists());
}

#[tokio::test]
async fn copies_nothing_without_an_old_home() {
    let root = TempDir::new().unwrap();

    assert!(
        !adopt_legacy_home(&root.path().join(".usemcpkit"), &root.path().join(".mcpkit"))
            .await
            .unwrap()
    );
}
