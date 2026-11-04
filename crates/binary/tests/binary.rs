use base64::Engine;
use base64::engine::general_purpose::STANDARD;
use flate2::Compression;
use flate2::write::GzEncoder;
use mcpkit_binary::platform::Target;
use mcpkit_binary::tar::{TAR_BLOCK_SIZE, extract_tar_file};
use mcpkit_binary::{
    BinaryContext, BinarySource, BinaryUpdateResult, InstalledBinary, PackageManagerInstall, PackageRelease,
    UPDATE_CHECK_INTERVAL_MS, auto_update_binary, check_for_binary_update, find_package_manager_install,
    install_binary, read_package_release, update_binary, verify_integrity,
};
use mcpkit_core::env::Env;
use mcpkit_http::HttpResponse;
use mcpkit_testing::RouteClient;
use serde_json::{Value, json};
use sha2::{Digest, Sha512};
use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::rc::Rc;
use tempfile::TempDir;

const REGISTRY: &str = "https://reg.example";

struct TarEntry<'a> {
    path: &'a str,
    prefix: &'a str,
    content: &'a str,
}

fn write_field(header: &mut [u8], offset: usize, value: &str) {
    header[offset..offset + value.len()].copy_from_slice(value.as_bytes());
}

/// A minimal ustar archive (regular files only) like the one inside an npm tarball.
fn create_tar(entries: &[TarEntry]) -> Vec<u8> {
    let mut archive = Vec::new();
    for entry in entries {
        let mut header = vec![0u8; TAR_BLOCK_SIZE];
        write_field(&mut header, 0, entry.path);
        write_field(&mut header, 100, "0000755\0");
        write_field(&mut header, 124, &format!("{:011o}\0", entry.content.len()));
        write_field(&mut header, 156, "0");
        write_field(&mut header, 257, "ustar\0");
        write_field(&mut header, 345, entry.prefix);
        archive.extend(header);
        let padded = entry.content.len().div_ceil(TAR_BLOCK_SIZE) * TAR_BLOCK_SIZE;
        let mut content = entry.content.as_bytes().to_vec();
        content.resize(padded, 0);
        archive.extend(content);
    }
    archive.extend(vec![0u8; TAR_BLOCK_SIZE * 2]);
    archive
}

fn gzip(bytes: &[u8]) -> Vec<u8> {
    let mut encoder = GzEncoder::new(Vec::new(), Compression::default());
    encoder.write_all(bytes).unwrap();
    encoder.finish().unwrap()
}

fn to_integrity(bytes: &[u8]) -> String {
    format!("sha512-{}", STANDARD.encode(Sha512::digest(bytes)))
}

fn bytes_response(body: Vec<u8>) -> HttpResponse {
    HttpResponse {
        status: 200,
        body,
        ..HttpResponse::default()
    }
}

fn json_body(body: &Value) -> HttpResponse {
    HttpResponse {
        content_type: Some("application/json".to_owned()),
        ..bytes_response(body.to_string().into_bytes())
    }
}

/// A registry that publishes `version` of the darwin-arm64 package, holding a runner and a server.
fn release_client(version: &str, runner: &str, server: &str) -> RouteClient {
    let tarball = gzip(&create_tar(&[
        TarEntry {
            path: "package/bin/mcpkit",
            prefix: "",
            content: runner,
        },
        TarEntry {
            path: "package/bin/mcpkit-server",
            prefix: "",
            content: server,
        },
    ]));
    let tarball_url = format!("{REGISTRY}/cli-darwin-arm64-{version}.tgz");
    let metadata = json!({
        "dist-tags": { "latest": version },
        "versions": { version: { "dist": { "tarball": tarball_url, "integrity": to_integrity(&tarball) } } },
    });
    RouteClient::new([
        (
            format!("{REGISTRY}/@usemcpkit%2fcli-darwin-arm64"),
            json_body(&metadata),
        ),
        (tarball_url, bytes_response(tarball)),
    ])
}

fn empty_client() -> RouteClient {
    RouteClient::new([])
}

fn create_context(home: &Path, client: RouteClient, exec_path: PathBuf) -> BinaryContext {
    let env = Env::from_pairs([
        ("MCPKIT_HOME", home.to_str().unwrap()),
        ("MCPKIT_NPM_REGISTRY", &format!("{REGISTRY}/")),
    ]);
    BinaryContext::new(Target::DarwinArm64, env, exec_path, Rc::new(client)).unwrap()
}

fn read(path: &Path) -> String {
    fs::read_to_string(path).unwrap()
}

#[test]
fn extract_tar_file_returns_the_requested_file_and_skips_the_others() {
    let archive = create_tar(&[
        TarEntry {
            path: "package/package.json",
            prefix: "",
            content: "{}",
        },
        TarEntry {
            path: "mcpkit",
            prefix: "package/bin",
            content: "binary",
        },
    ]);

    assert_eq!(extract_tar_file(&archive, "package/bin/mcpkit").unwrap(), b"binary");
}

#[test]
fn extract_tar_file_fails_when_the_file_is_missing() {
    let archive = create_tar(&[TarEntry {
        path: "package/a",
        prefix: "",
        content: "",
    }]);

    let error = extract_tar_file(&archive, "package/b").unwrap_err();

    assert!(error.0.contains("tarball has no package/b"), "{error}");
}

#[test]
fn verify_integrity_accepts_matching_sha512_integrity() {
    verify_integrity(b"mcpkit", &to_integrity(b"mcpkit"), "x").unwrap();
}

#[test]
fn verify_integrity_rejects_a_mismatch_and_unknown_algorithms() {
    let mismatch = verify_integrity(b"mcpkit", &to_integrity(&[1]), "x").unwrap_err();
    let unknown = verify_integrity(b"mcpkit", "md5-abc", "x").unwrap_err();

    assert!(mismatch.0.contains("does not match"), "{mismatch}");
    assert!(unknown.0.contains("unsupported integrity"), "{unknown}");
}

fn release_metadata() -> Value {
    json!({
        "dist-tags": { "latest": "1.2.0" },
        "versions": { "1.2.0": { "dist": { "tarball": "https://t/1.2.0.tgz", "integrity": "sha512-x" } } },
    })
}

#[test]
fn read_package_release_resolves_dist_tags_to_a_version() {
    assert_eq!(
        read_package_release(&release_metadata(), "pkg", "latest").unwrap(),
        PackageRelease {
            version: "1.2.0".to_owned(),
            tarball: "https://t/1.2.0.tgz".to_owned(),
            integrity: "sha512-x".to_owned(),
        }
    );
}

#[test]
fn read_package_release_fails_for_unpublished_versions() {
    let error = read_package_release(&release_metadata(), "pkg", "9.9.9").unwrap_err();

    assert!(error.0.contains("pkg@9.9.9 is not published"), "{error}");
}

fn write_installed_pair(dir: &Path) -> PathBuf {
    fs::create_dir_all(dir).unwrap();
    let path = dir.join("mcpkit");
    fs::write(&path, "old").unwrap();
    fs::write(dir.join("mcpkit-server"), "old server").unwrap();
    path
}

#[tokio::test(flavor = "current_thread")]
async fn update_binary_replaces_both_binaries_with_a_newer_verified_release() {
    let home = TempDir::new().unwrap();
    let path = write_installed_pair(&home.path().join("bin"));
    let context = create_context(home.path(), release_client("0.2.0", "new", "new server"), path.clone());

    let result = update_binary(&context, &path, "0.1.0").await.unwrap();

    assert_eq!(
        result,
        BinaryUpdateResult::Updated {
            from: "0.1.0".to_owned(),
            to: "0.2.0".to_owned(),
            path: path.clone(),
        }
    );
    assert_eq!(read(&path), "new");
    assert_eq!(read(&home.path().join("bin").join("mcpkit-server")), "new server");
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        assert_ne!(fs::metadata(&path).unwrap().permissions().mode() & 0o111, 0);
    }
}

#[tokio::test(flavor = "current_thread")]
async fn update_binary_keeps_the_binary_when_the_latest_release_is_not_newer() {
    let home = TempDir::new().unwrap();
    let context = create_context(
        home.path(),
        release_client("0.1.0", "same", "same"),
        PathBuf::from("unused"),
    );

    let result = update_binary(&context, Path::new("unused"), "0.1.0").await.unwrap();

    assert_eq!(
        result,
        BinaryUpdateResult::UpToDate {
            version: "0.1.0".to_owned()
        }
    );
}

#[tokio::test(flavor = "current_thread")]
async fn update_binary_explains_how_to_proceed_when_the_platform_package_is_not_published() {
    let home = TempDir::new().unwrap();
    let context = create_context(home.path(), empty_client(), PathBuf::from("unused"));

    let error = update_binary(&context, Path::new("unused"), "0.1.0").await.unwrap_err();

    assert!(
        error
            .0
            .starts_with("@usemcpkit/cli-darwin-arm64 is not published on https://reg.example; "),
        "{error}"
    );
    assert!(error.0.contains("--binary"), "{error}");
}

#[tokio::test(flavor = "current_thread")]
async fn update_binary_writes_nothing_when_the_release_lacks_the_server() {
    let home = TempDir::new().unwrap();
    let path = write_installed_pair(&home.path().join("bin"));
    let tarball = gzip(&create_tar(&[TarEntry {
        path: "package/bin/mcpkit",
        prefix: "",
        content: "new",
    }]));
    let tarball_url = format!("{REGISTRY}/runner-only.tgz");
    let metadata = json!({
        "dist-tags": { "latest": "0.2.0" },
        "versions": { "0.2.0": { "dist": { "tarball": tarball_url, "integrity": to_integrity(&tarball) } } },
    });
    let client = RouteClient::new([
        (
            format!("{REGISTRY}/@usemcpkit%2fcli-darwin-arm64"),
            json_body(&metadata),
        ),
        (tarball_url, bytes_response(tarball)),
    ]);
    let context = create_context(home.path(), client, path.clone());

    let error = update_binary(&context, &path, "0.1.0").await.unwrap_err();

    assert!(error.0.contains("tarball has no package/bin/mcpkit-server"), "{error}");
    assert_eq!(read(&path), "old");
}

#[tokio::test(flavor = "current_thread")]
async fn update_binary_rejects_a_tarball_that_fails_its_integrity() {
    let home = TempDir::new().unwrap();
    let path = write_installed_pair(&home.path().join("bin"));
    let tarball_url = format!("{REGISTRY}/tampered.tgz");
    let metadata = json!({
        "dist-tags": { "latest": "0.2.0" },
        "versions": { "0.2.0": { "dist": { "tarball": tarball_url, "integrity": to_integrity(b"other") } } },
    });
    let client = RouteClient::new([
        (
            format!("{REGISTRY}/@usemcpkit%2fcli-darwin-arm64"),
            json_body(&metadata),
        ),
        (tarball_url, bytes_response(gzip(b"tampered"))),
    ]);
    let context = create_context(home.path(), client, path.clone());

    let error = update_binary(&context, &path, "0.1.0").await.unwrap_err();

    assert!(error.0.contains("does not match"), "{error}");
    assert_eq!(read(&path), "old");
}

#[test]
fn install_binary_copies_a_local_runner_and_its_server_into_mcpkit_home_bin() {
    let home = TempDir::new().unwrap();
    let source_dir = home.path().join("build");
    fs::create_dir(&source_dir).unwrap();
    let source = source_dir.join("mcpkit");
    fs::write(&source, "local").unwrap();
    fs::write(source_dir.join("mcpkit-server"), "local server").unwrap();
    let context = create_context(home.path(), empty_client(), PathBuf::from("unused"));

    let installed = install_binary(
        &context,
        &BinarySource {
            path: Some(source),
            version: "0.1.0".to_owned(),
        },
    )
    .unwrap();

    let bin = home.path().join("bin");
    assert_eq!(
        installed,
        InstalledBinary {
            path: bin.join("mcpkit"),
            server_path: bin.join("mcpkit-server"),
            version: "0.1.0".to_owned(),
        }
    );
    assert_eq!(read(&installed.path), "local");
    assert_eq!(read(&installed.server_path), "local server");
}

#[test]
fn install_binary_copies_the_running_runner_and_the_server_next_to_it() {
    let home = TempDir::new().unwrap();
    let running_dir = home.path().join("downloads");
    fs::create_dir(&running_dir).unwrap();
    fs::write(running_dir.join("mcpkit"), "running").unwrap();
    fs::write(running_dir.join("mcpkit-server"), "running server").unwrap();
    let context = create_context(home.path(), empty_client(), running_dir.join("mcpkit"));

    let installed = install_binary(
        &context,
        &BinarySource {
            path: None,
            version: "0.1.0".to_owned(),
        },
    )
    .unwrap();

    assert_eq!(read(&installed.path), "running");
    assert_eq!(read(&installed.server_path), "running server");
}

#[test]
fn install_binary_refuses_a_runner_without_its_server() {
    let home = TempDir::new().unwrap();
    let source = home.path().join("mcpkit");
    fs::write(&source, "local").unwrap();
    let context = create_context(home.path(), empty_client(), PathBuf::from("unused"));

    let error = install_binary(
        &context,
        &BinarySource {
            path: Some(source),
            version: "0.1.0".to_owned(),
        },
    )
    .unwrap_err();

    assert!(error.0.contains("mcpkit-server"), "{error}");
    assert!(!home.path().join("bin").join("mcpkit").exists());
}

#[tokio::test(flavor = "current_thread")]
async fn auto_update_binary_does_nothing_outside_the_installed_binary() {
    let home = TempDir::new().unwrap();
    let context = create_context(
        home.path(),
        empty_client(),
        home.path().join("elsewhere").join("mcpkit"),
    );

    assert_eq!(auto_update_binary(&context, "0.1.0", 0).await.unwrap(), None);
}

const START: u64 = 10 * UPDATE_CHECK_INTERVAL_MS;

#[tokio::test(flavor = "current_thread")]
async fn check_for_binary_update_does_not_record_a_failed_check_so_the_next_call_tries_again() {
    let home = TempDir::new().unwrap();
    let path = write_installed_pair(home.path());

    let failed = create_context(home.path(), empty_client(), path.clone());
    let error = check_for_binary_update(&failed, &path, "0.1.0", START)
        .await
        .unwrap_err();
    let retrying = create_context(home.path(), release_client("0.2.0", "new", "new server"), path.clone());
    let retried = check_for_binary_update(&retrying, &path, "0.1.0", START + 1_000)
        .await
        .unwrap();

    assert!(error.0.contains("is not published"), "{error}");
    assert_eq!(
        retried,
        Some(BinaryUpdateResult::Updated {
            from: "0.1.0".to_owned(),
            to: "0.2.0".to_owned(),
            path: path.clone(),
        })
    );
    assert_eq!(read(&path), "new");
}

#[tokio::test(flavor = "current_thread")]
async fn check_for_binary_update_skips_until_the_interval_has_passed_once_a_check_has_finished() {
    let home = TempDir::new().unwrap();
    let path = write_installed_pair(home.path());
    let context = create_context(home.path(), release_client("0.1.0", "same", "same"), path.clone());
    let up_to_date = Some(BinaryUpdateResult::UpToDate {
        version: "0.1.0".to_owned(),
    });

    let first = check_for_binary_update(&context, &path, "0.1.0", START).await.unwrap();
    let soon = check_for_binary_update(&context, &path, "0.1.0", START + 1_000)
        .await
        .unwrap();
    let later = check_for_binary_update(&context, &path, "0.1.0", START + UPDATE_CHECK_INTERVAL_MS)
        .await
        .unwrap();

    assert_eq!(first, up_to_date);
    assert_eq!(soon, None);
    assert_eq!(later, up_to_date);
    assert_eq!(
        read(&home.path().join("update-state.json")),
        format!("{{\"checkedAt\":{}}}\n", START + UPDATE_CHECK_INTERVAL_MS)
    );
}

#[test]
fn find_package_manager_install_points_homebrew_installs_at_the_linked_bin_path() {
    assert_eq!(
        find_package_manager_install("/opt/homebrew/Cellar/mcpkit/0.2.0/bin/mcpkit").unwrap(),
        Some(PackageManagerInstall {
            manager: "Homebrew".to_owned(),
            path: "/opt/homebrew/bin/mcpkit".to_owned(),
            upgrade_command: "brew upgrade mcpkit".to_owned(),
        })
    );
    let linuxbrew = find_package_manager_install("/home/linuxbrew/.linuxbrew/Cellar/mcpkit/0.2.0/bin/mcpkit")
        .unwrap()
        .unwrap();
    assert_eq!(linuxbrew.path, "/home/linuxbrew/.linuxbrew/bin/mcpkit");
}

#[test]
fn find_package_manager_install_keeps_winget_installs_in_their_package_folder() {
    let path = r"C:\Users\me\AppData\Local\Microsoft\WinGet\Packages\Mcpkit.Mcpkit_Microsoft.Winget.Source_8wekyb3d8bbwe\mcpkit.exe";

    assert_eq!(
        find_package_manager_install(path).unwrap(),
        Some(PackageManagerInstall {
            manager: "winget".to_owned(),
            path: path.to_owned(),
            upgrade_command: "winget upgrade --id Mcpkit.Mcpkit".to_owned(),
        })
    );
}

#[test]
fn find_package_manager_install_recognizes_the_winget_binary_named_after_its_usemcpkit_command() {
    let path = r"C:\Users\me\AppData\Local\Microsoft\WinGet\Packages\MDReal32.UseMCPKit__DefaultSource\usemcpkit.exe";

    let found = find_package_manager_install(path).unwrap().unwrap();

    assert_eq!(found.upgrade_command, "winget upgrade --id MDReal32.UseMCPKit");
}

#[test]
fn find_package_manager_install_ignores_binaries_outside_a_package_manager() {
    assert_eq!(
        find_package_manager_install("/Users/me/.mcpkit/bin/mcpkit").unwrap(),
        None
    );
}

#[cfg(unix)]
#[test]
fn detect_package_manager_install_follows_the_homebrew_bin_link_into_the_cellar() {
    let home = TempDir::new().unwrap();
    let prefix = fs::canonicalize(home.path()).unwrap();
    let cellar_bin = prefix.join("Cellar/mcpkit/0.2.0/bin");
    fs::create_dir_all(&cellar_bin).unwrap();
    fs::create_dir(prefix.join("bin")).unwrap();
    fs::write(cellar_bin.join("mcpkit"), "binary").unwrap();
    std::os::unix::fs::symlink(cellar_bin.join("mcpkit"), prefix.join("bin/mcpkit")).unwrap();

    let found = mcpkit_binary::detect_package_manager_install(&prefix.join("bin/mcpkit"))
        .unwrap()
        .unwrap();

    assert_eq!(found.path, prefix.join("bin/mcpkit").to_string_lossy());
}
