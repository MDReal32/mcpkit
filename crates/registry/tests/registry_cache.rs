use serde_json::Value;
use std::cell::RefCell;
use std::collections::HashMap;
use std::fs;
use std::path::{Path, PathBuf};
use std::rc::Rc;
use tempfile::TempDir;
use usemcpkit_registry::{
    DEFAULT_REGISTRY_URL, Fetch, RegistryContext, RegistryError, ensure_manifest_index, load_group_manifest,
    load_groups, read_cached_index, sync_registry,
};

/// Serves the registry `packages/servers` builds as if it were published, logging every URL asked for.
struct FolderFetcher {
    root: PathBuf,
    fetched: Rc<RefCell<Vec<String>>>,
    overrides: HashMap<String, String>,
}

impl Fetch for FolderFetcher {
    async fn fetch_text(&self, url: &str) -> Result<String, RegistryError> {
        self.fetched.borrow_mut().push(url.to_owned());
        if let Some(text) = self.overrides.get(url) {
            return Ok(text.clone());
        }
        let path = url
            .strip_prefix(&format!("{DEFAULT_REGISTRY_URL}/"))
            .ok_or_else(|| RegistryError::failed(format!("GET {url} failed: 404")))?;
        fs::read_to_string(self.root.join(path)).map_err(|error| RegistryError::failed(format!("GET {url}: {error}")))
    }
}

struct Fixture {
    cache: TempDir,
    fetched: Rc<RefCell<Vec<String>>>,
    warnings: Rc<RefCell<Vec<String>>>,
    context: RegistryContext<FolderFetcher>,
}

fn registry_root() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("../../packages/servers/build/manifests")
}

fn link(path: &str) -> String {
    format!("{DEFAULT_REGISTRY_URL}/{path}")
}

/// The servers of the built registry, so a new server needs no change here.
fn indexed_server_count() -> usize {
    let index: Value =
        serde_json::from_str(&fs::read_to_string(registry_root().join("index.json")).expect("index.json"))
            .expect("an index");
    index["servers"].as_array().expect("a server list").len()
}

fn fixture(overrides: HashMap<String, String>) -> Fixture {
    let cache = TempDir::new().expect("a temp folder");
    let fetched = Rc::new(RefCell::new(Vec::new()));
    let warnings = Rc::new(RefCell::new(Vec::new()));
    let fetcher = FolderFetcher {
        root: registry_root(),
        fetched: Rc::clone(&fetched),
        overrides,
    };
    let mut context = RegistryContext::new(cache.path().join("manifests"), DEFAULT_REGISTRY_URL.into(), fetcher);
    let sink = Rc::clone(&warnings);
    context.warn = Box::new(move |message| sink.borrow_mut().push(message.to_owned()));
    Fixture {
        cache,
        fetched,
        warnings,
        context,
    }
}

fn cache_keys(fixture: &Fixture) -> Vec<String> {
    let text = fs::read_to_string(fixture.context.dir.join("cache.json")).expect("cache.json");
    let map: serde_json::Map<String, Value> = serde_json::from_str(&text).expect("a cache map");
    map.keys().cloned().collect()
}

async fn github(fixture: &Fixture) -> usemcpkit_manifest::registry::RegistryServer {
    let index = read_cached_index(&fixture.context.dir)
        .await
        .expect("readable")
        .expect("an index");
    index
        .servers
        .into_iter()
        .find(|server| server.id == "git:github")
        .expect("git:github in the index")
}

#[tokio::test]
async fn syncs_the_index_and_downloads_nothing_nobody_opened() {
    let fixture = fixture(HashMap::new());

    let report = sync_registry(&fixture.context).await.expect("a sync");

    assert_eq!(report.servers, indexed_server_count());
    assert!(report.refreshed.is_empty() && report.failed.is_empty());
    assert_eq!(*fixture.fetched.borrow(), [link("index.json")]);
    assert_eq!(cache_keys(&fixture), ["index.json"]);
    let written = fs::read_to_string(fixture.context.dir.join("index.json")).expect("the cached index");
    assert!(written.ends_with("}\n") && written.contains("\n  \"servers\": [\n"));
}

#[tokio::test]
async fn opens_a_group_with_its_shell_and_part_alone_and_then_from_the_cache() {
    let fixture = fixture(HashMap::new());
    sync_registry(&fixture.context).await.expect("a sync");
    let server = github(&fixture).await;

    let groups = load_groups(&server, &fixture.context).await.expect("the groups");
    let manifest = load_group_manifest(&server, &fixture.context, Some("repos"))
        .await
        .expect("the repos group");
    load_group_manifest(&server, &fixture.context, Some("repos"))
        .await
        .expect("the repos group again");

    assert_eq!(groups.len(), 9);
    assert!(!manifest.tools.is_empty());
    assert!(manifest.tools.iter().all(|tool| tool.name.starts_with("repos:")));
    assert_eq!(
        *fixture.fetched.borrow(),
        [
            link("index.json"),
            link("git/github.json"),
            link("git/github/repos.json")
        ]
    );
    assert_eq!(
        cache_keys(&fixture),
        ["index.json", "git/github.json", "git/github/repos.json"]
    );
    for file in ["git/github.json", "git/github/repos.json"] {
        let shipped = fs::read_to_string(registry_root().join(file)).expect("the built file");
        let cached = fs::read_to_string(fixture.context.dir.join(file)).expect("the cached file");
        assert!(!shipped.contains('\n'), "{file} ships minified");
        assert!(
            cached.starts_with("{\n  \"") && cached.ends_with("}\n"),
            "{file} is cached formatted"
        );
    }
    assert!(fixture.warnings.borrow().is_empty());
}

#[tokio::test]
async fn fetches_the_index_again_once_when_a_download_does_not_match_it() {
    let fixture = fixture(HashMap::new());
    sync_registry(&fixture.context).await.expect("a sync");
    let mut stale = github(&fixture).await;
    stale.sha256 = "0".repeat(64);

    let groups = load_groups(&stale, &fixture.context)
        .await
        .expect("the groups after a retry");

    assert_eq!(groups.len(), 9);
    assert_eq!(
        *fixture.fetched.borrow(),
        [
            link("index.json"),
            link("git/github.json"),
            link("index.json"),
            link("git/github.json")
        ]
    );
}

#[tokio::test]
async fn refuses_a_part_that_does_not_match_its_shell() {
    let overrides = HashMap::from([(link("git/github/repos.json"), "{\"tools\":[]}".to_owned())]);
    let fixture = fixture(overrides);
    sync_registry(&fixture.context).await.expect("a sync");
    let server = github(&fixture).await;

    let error = load_group_manifest(&server, &fixture.context, Some("repos"))
        .await
        .expect_err("a checksum failure");

    assert_eq!(
        error,
        RegistryError::failed(format!(
            "git:github: {} does not match the checksum in the manifest",
            link("git/github/repos.json")
        ))
    );
    assert!(!fixture.context.dir.join("git/github/repos.json").exists());
}

#[tokio::test]
async fn sync_replaces_only_the_cached_parts_that_went_stale() {
    let fixture = fixture(HashMap::new());
    sync_registry(&fixture.context).await.expect("a sync");
    let server = github(&fixture).await;
    load_group_manifest(&server, &fixture.context, Some("repos"))
        .await
        .expect("the repos group");
    let part = fixture.context.dir.join("git/github/repos.json");
    fs::write(&part, "{\"tools\":[]}").expect("a stale part");
    fixture.fetched.borrow_mut().clear();

    let report = sync_registry(&fixture.context).await.expect("a sync");

    assert_eq!(report.refreshed, ["git:github/repos"]);
    assert_eq!(
        *fixture.fetched.borrow(),
        [link("index.json"), link("git/github/repos.json")]
    );
    let restored = fs::read_to_string(&part).expect("the part");
    let published = fs::read_to_string(registry_root().join("git/github/repos.json")).expect("the published part");
    let parse = |text: &str| serde_json::from_str::<Value>(text).expect("JSON");
    assert_eq!(parse(&restored), parse(&published));
    assert!(restored.ends_with("}\n") && restored.contains("\n  \"tools\": [\n"));
}

#[tokio::test]
async fn rebuilds_an_unreadable_cache_map_with_a_warning() {
    let fixture = fixture(HashMap::new());
    fs::create_dir_all(&fixture.context.dir).expect("the manifests folder");
    fs::write(fixture.context.dir.join("cache.json"), "not json").expect("a broken map");

    sync_registry(&fixture.context).await.expect("a sync");

    assert_eq!(cache_keys(&fixture), ["index.json"]);
    let warnings = fixture.warnings.borrow();
    assert_eq!(
        warnings.len(),
        2,
        "touching the index and recording it each read the map: {warnings:?}"
    );
    assert!(
        warnings
            .iter()
            .all(|warning| warning.contains("is unreadable and will be rebuilt"))
    );
    assert!(fixture.cache.path().exists());
}

fn index_registry(fixture: &Fixture) -> Option<String> {
    let text = fs::read_to_string(fixture.context.dir.join("cache.json")).expect("cache.json");
    let map: Value = serde_json::from_str(&text).expect("a cache map");
    map["index.json"]["registry"].as_str().map(str::to_owned)
}

fn note_index_registry(fixture: &Fixture, registry: Option<&str>) {
    let file = fixture.context.dir.join("cache.json");
    let mut map: Value = serde_json::from_str(&fs::read_to_string(&file).expect("cache.json")).expect("a cache map");
    let entry = map["index.json"].as_object_mut().expect("the index entry");
    match registry {
        Some(registry) => entry.insert("registry".to_owned(), Value::from(registry)),
        None => entry.remove("registry"),
    };
    fs::write(&file, map.to_string()).expect("the cache map");
}

#[tokio::test]
async fn serves_an_index_fetched_from_the_same_registry_without_asking_it() {
    let fixture = fixture(HashMap::new());
    sync_registry(&fixture.context).await.expect("a sync");
    assert_eq!(index_registry(&fixture).as_deref(), Some(DEFAULT_REGISTRY_URL));
    fixture.fetched.borrow_mut().clear();

    ensure_manifest_index(&fixture.context).await.expect("the index");

    assert!(fixture.fetched.borrow().is_empty());
}

#[tokio::test]
async fn syncs_an_index_fetched_from_another_registry_or_none_noted_once() {
    for previous in [Some("https://mdreal32.github.io/mcpkit/v0.12.0"), None] {
        let fixture = fixture(HashMap::new());
        sync_registry(&fixture.context).await.expect("a sync");
        note_index_registry(&fixture, previous);
        fixture.fetched.borrow_mut().clear();

        ensure_manifest_index(&fixture.context).await.expect("the index");
        ensure_manifest_index(&fixture.context).await.expect("the index again");

        assert_eq!(*fixture.fetched.borrow(), [link("index.json")], "after {previous:?}");
        assert_eq!(index_registry(&fixture).as_deref(), Some(DEFAULT_REGISTRY_URL));
    }
}

#[tokio::test]
async fn keeps_serving_an_index_from_another_registry_when_the_sync_fails() {
    let mut fixture = fixture(HashMap::new());
    sync_registry(&fixture.context).await.expect("a sync");
    note_index_registry(&fixture, Some("https://mdreal32.github.io/mcpkit/v0.12.0"));
    fixture.context.registry_url = "https://unreachable.test".into();

    ensure_manifest_index(&fixture.context).await.expect("the index");

    assert!(
        read_cached_index(&fixture.context.dir)
            .await
            .expect("readable")
            .is_some()
    );
    let warnings = fixture.warnings.borrow();
    assert!(
        warnings.iter().any(|warning| warning.contains("registry sync failed")),
        "{warnings:?}"
    );
}
