use indexmap::IndexMap;
use mcpkit_core::env::Env;
use mcpkit_http::HttpResponse;
use mcpkit_manifest::upstream::{RepoSetupStep, StdioUpstream, UpstreamRepo, UpstreamSpec};
use mcpkit_testing::FixedClient;
use mcpkit_upstream::repo::{REPO_CHECK_INTERVAL_MS, RepoOptions, RepoState, ensure_repo, read_repo_state};
use mcpkit_upstream::{UpstreamConnection, UpstreamError, UpstreamOptions, connect_upstream};
use serde_json::json;
use std::cell::{Cell, RefCell};
use std::path::{Path, PathBuf};
use std::process::Command;
use std::rc::Rc;

const FAKE_UPSTREAM: &str = env!("CARGO_BIN_EXE_fake-upstream");

/// A source repository holding the fake server's tools file, and the folder its clone goes to.
struct Fixture {
    root: tempfile::TempDir,
    source: PathBuf,
    commit: String,
    clock: Rc<Cell<u64>>,
}

impl Fixture {
    fn new() -> Self {
        let root = tempfile::tempdir().unwrap();
        let source = root.path().join("source");
        git(root.path(), &["init", "--quiet", &source.to_string_lossy()]);
        let tools = json!([
            { "name": "echo", "description": "Echoes text", "inputSchema": { "type": "object" } },
            { "name": "whoami", "description": "Reads TOKEN", "inputSchema": { "type": "object" } },
        ]);
        std::fs::write(source.join("tools.json"), tools.to_string()).unwrap();
        git(&source, &["add", "."]);
        git(&source, &["commit", "--quiet", "-m", "init"]);
        let commit = git(&source, &["rev-parse", "HEAD"]);
        Fixture {
            root,
            source,
            commit,
            clock: Rc::new(Cell::new(1_000)),
        }
    }

    fn dir(&self) -> PathBuf {
        self.root.path().join("repos").join("demo")
    }

    fn repo(&self, reference: &str, setup: &[&[&str]]) -> UpstreamRepo {
        UpstreamRepo {
            url: self.source.to_string_lossy().into_owned(),
            reference: reference.to_owned(),
            setup: match setup.is_empty() {
                true => None,
                false => Some(
                    setup
                        .iter()
                        .map(|args| RepoSetupStep {
                            command: FAKE_UPSTREAM.to_owned(),
                            args: Some(args.iter().map(|arg| (*arg).to_owned()).collect()),
                        })
                        .collect(),
                ),
            },
        }
    }

    fn later(&self, ms: u64) {
        self.clock.set(self.clock.get() + ms);
    }

    fn commit_file(&self, name: &str) -> String {
        std::fs::write(self.source.join(name), name).unwrap();
        git(&self.source, &["add", "."]);
        git(&self.source, &["commit", "--quiet", "-m", name]);
        git(&self.source, &["rev-parse", "HEAD"])
    }

    fn repo_options(&self, check: bool, warnings: &Rc<RefCell<Vec<String>>>) -> RepoOptions {
        let clock = Rc::clone(&self.clock);
        let warnings = Rc::clone(warnings);
        RepoOptions {
            check,
            warn: Rc::new(move |message| warnings.borrow_mut().push(message.to_owned())),
            now: Rc::new(move || clock.get()),
            env: Env::from_process(),
        }
    }

    async fn ensure(&self, repo: &UpstreamRepo, check: bool) -> Vec<String> {
        let warnings = Rc::new(RefCell::new(Vec::new()));
        ensure_repo(repo, &self.dir(), &self.repo_options(check, &warnings))
            .await
            .unwrap();
        warnings.take()
    }

    async fn state(&self) -> RepoState {
        read_repo_state(&self.dir()).await.unwrap().unwrap()
    }

    fn options(&self, process_env: Env, env: &[(&str, &str)]) -> UpstreamOptions {
        let mut options = UpstreamOptions::new(Rc::new(FixedClient::new(HttpResponse::default())), process_env);
        options.repo_dir = Some(self.dir());
        options.env = env
            .iter()
            .map(|(name, value)| ((*name).to_owned(), (*value).to_owned()))
            .collect::<IndexMap<_, _>>();
        options
    }

    async fn connect(
        &self,
        repo: UpstreamRepo,
        options: &UpstreamOptions,
    ) -> Result<UpstreamConnection, UpstreamError> {
        connect_upstream(&served_from(repo), options).await
    }

    fn read(&self, name: &str) -> String {
        std::fs::read_to_string(self.dir().join(name)).unwrap()
    }
}

fn git(cwd: &Path, args: &[&str]) -> String {
    let output = Command::new("git")
        .args([
            "-c",
            "user.name=t",
            "-c",
            "user.email=t@t",
            "-c",
            "commit.gpgsign=false",
        ])
        .args(args)
        .current_dir(cwd)
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "git {args:?}: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    String::from_utf8(output.stdout).unwrap().trim().to_owned()
}

/// The fake server reading its tools from the clone, so it only starts when the clone is there.
fn served_from(repo: UpstreamRepo) -> UpstreamSpec {
    UpstreamSpec::Stdio(Box::new(StdioUpstream {
        command: FAKE_UPSTREAM.to_owned(),
        args: Some(vec!["{repo}/tools.json".to_owned()]),
        forward_env: None,
        optional_env: None,
        ui: None,
        repo: Some(repo),
        naming: None,
    }))
}

#[tokio::test]
async fn clones_at_the_pinned_commit_runs_setup_once_and_starts_the_program_from_the_clone() {
    let fixture = Fixture::new();
    let repo = fixture.repo(&fixture.commit, &[&["stamp"]]);
    let options = fixture.options(Env::from_process(), &[]);

    let first = fixture.connect(repo.clone(), &options).await.unwrap();
    let stamp = fixture.read("stamp.txt");
    first.close().await;
    let second = fixture.connect(repo, &options).await.unwrap();
    let result = second
        .call_tool("echo", json!({ "text": "hi" }).as_object().cloned())
        .await;
    second.close().await;

    assert_eq!(result, Ok(json!({ "content": [{ "type": "text", "text": "hi" }] })));
    assert_eq!(fixture.read("stamp.txt"), stamp);
}

#[tokio::test]
async fn hands_setup_no_credentials_only_the_server() {
    let fixture = Fixture::new();
    let leaky = Env::from_process().with("TOKEN", "from-mcpkit");
    let options = fixture.options(leaky, &[("TOKEN", "secret-1")]);

    let connection = fixture
        .connect(
            fixture.repo(&fixture.commit, &[&["seen", "TOKEN", "CARGO_MANIFEST_DIR"]]),
            &options,
        )
        .await
        .unwrap();
    let result = connection.call_tool("whoami", None).await.unwrap();
    connection.close().await;

    assert_eq!(fixture.read("seen.txt"), "none,none");
    assert_eq!(result["content"][0]["text"], "secret-1");
}

#[tokio::test]
async fn leaves_no_clone_behind_when_setup_fails() {
    let fixture = Fixture::new();
    let options = fixture.options(Env::from_process(), &[]);

    let failed = fixture
        .connect(fixture.repo(&fixture.commit, &[&["fail"]]), &options)
        .await;

    let message = failed.err().unwrap().to_string();
    assert!(
        message.contains("fail failed in") && message.ends_with("exited with code 3"),
        "{message}"
    );
    let left: Vec<_> = std::fs::read_dir(fixture.root.path().join("repos"))
        .unwrap()
        .map(|entry| entry.unwrap().file_name())
        .collect();
    assert_eq!(left, Vec::<std::ffi::OsString>::new());
}

#[tokio::test]
async fn needs_a_folder_to_clone_into() {
    let fixture = Fixture::new();
    let mut options = fixture.options(Env::from_process(), &[]);
    options.repo_dir = None;

    let failed = fixture.connect(fixture.repo(&fixture.commit, &[]), &options).await;

    assert!(failed.err().unwrap().to_string().contains("no folder was given"));
}

#[cfg(windows)]
#[tokio::test]
async fn runs_a_setup_step_that_is_a_cmd_script_on_path() {
    let fixture = Fixture::new();
    let bin = tempfile::tempdir().unwrap();
    std::fs::write(bin.path().join("set-up.cmd"), "@echo ran> ran.txt\r\n").unwrap();
    let path = format!(
        "{};{}",
        bin.path().display(),
        Env::from_process().get("PATH").unwrap_or_default()
    );
    let mut repo = fixture.repo(&fixture.commit, &[]);
    repo.setup = Some(vec![RepoSetupStep {
        command: "set-up".to_owned(),
        args: None,
    }]);
    let warnings = Rc::new(RefCell::new(Vec::new()));
    let mut options = fixture.repo_options(true, &warnings);
    options.env = Env::from_process().with("PATH", &path);

    ensure_repo(&repo, &fixture.dir(), &options).await.unwrap();

    assert_eq!(fixture.read("ran.txt").trim(), "ran");
}

#[tokio::test]
async fn records_the_commit_the_ref_resolved_to_and_when_the_clone_was_built_and_checked() {
    let fixture = Fixture::new();

    fixture.ensure(&fixture.repo("HEAD", &[]), true).await;

    let state = fixture.state().await;
    assert_eq!(state.commit.as_deref(), Some(fixture.commit.as_str()));
    assert_eq!((state.updated_at, state.checked_at), (1_000, 1_000));
}

#[tokio::test]
async fn uses_the_clone_until_the_last_check_is_older_than_the_interval_then_rebuilds_it_when_the_ref_moved() {
    let fixture = Fixture::new();
    let repo = fixture.repo("HEAD", &[]);
    fixture.ensure(&repo, true).await;
    let moved = fixture.commit_file("moved.txt");

    fixture.later(REPO_CHECK_INTERVAL_MS - 1);
    fixture.ensure(&repo, true).await;
    assert!(!fixture.dir().join("moved.txt").exists());

    fixture.later(2);
    fixture.ensure(&repo, true).await;
    assert!(fixture.dir().join("moved.txt").exists());
    let state = fixture.state().await;
    let now = fixture.clock.get();
    assert_eq!(state.commit, Some(moved));
    assert_eq!((state.updated_at, state.checked_at), (now, now));
}

#[tokio::test]
async fn keeps_the_clone_and_only_marks_the_check_when_the_ref_did_not_move() {
    let fixture = Fixture::new();
    let repo = fixture.repo("HEAD", &[&["stamp"]]);
    fixture.ensure(&repo, true).await;
    let stamp = fixture.read("stamp.txt");

    fixture.later(REPO_CHECK_INTERVAL_MS);
    fixture.ensure(&repo, true).await;

    assert_eq!(fixture.read("stamp.txt"), stamp);
    let state = fixture.state().await;
    assert_eq!(state.commit.as_deref(), Some(fixture.commit.as_str()));
    assert_eq!((state.updated_at, state.checked_at), (1_000, fixture.clock.get()));
}

#[tokio::test]
async fn follows_an_annotated_tag_to_its_commit() {
    let fixture = Fixture::new();
    git(&fixture.source, &["tag", "-a", "v1", "-m", "v1"]);
    let repo = fixture.repo("v1", &[]);
    fixture.ensure(&repo, true).await;

    fixture.later(REPO_CHECK_INTERVAL_MS);
    fixture.ensure(&repo, true).await;

    let state = fixture.state().await;
    assert_eq!(state.commit.as_deref(), Some(fixture.commit.as_str()));
    assert_eq!(state.updated_at, 1_000);
}

#[tokio::test]
async fn keeps_the_clone_and_warns_when_the_remote_cannot_be_reached() {
    let fixture = Fixture::new();
    let repo = fixture.repo("HEAD", &[]);
    fixture.ensure(&repo, true).await;
    std::fs::remove_dir_all(&fixture.source).unwrap();

    fixture.later(REPO_CHECK_INTERVAL_MS);
    let first = fixture.ensure(&repo, true).await;
    let second = fixture.ensure(&repo, true).await;

    assert!(fixture.dir().join("tools.json").exists());
    assert_eq!(first.len(), 1);
    assert!(first[0].contains("using the clone it has"), "{first:?}");
    assert_eq!(second, Vec::<String>::new());
}

#[tokio::test]
async fn never_compares_a_pinned_commit() {
    let fixture = Fixture::new();
    let repo = fixture.repo(&fixture.commit, &[]);
    fixture.ensure(&repo, true).await;
    std::fs::remove_dir_all(&fixture.source).unwrap();

    fixture.later(REPO_CHECK_INTERVAL_MS * 10);
    let warnings = fixture.ensure(&repo, true).await;

    assert_eq!(warnings, Vec::<String>::new());
    assert_eq!(fixture.state().await.checked_at, 1_000);
}

#[tokio::test]
async fn does_not_compare_when_checking_is_turned_off() {
    let fixture = Fixture::new();
    let repo = fixture.repo("HEAD", &[]);
    fixture.ensure(&repo, true).await;
    fixture.commit_file("moved.txt");

    fixture.later(REPO_CHECK_INTERVAL_MS);
    fixture.ensure(&repo, false).await;

    assert!(!fixture.dir().join("moved.txt").exists());
}

#[tokio::test]
async fn adopts_a_clone_marked_before_states_existed_and_rebuilds_it_only_when_its_ref_moved() {
    let fixture = Fixture::new();
    let repo = fixture.repo("HEAD", &[]);
    fixture.ensure(&repo, true).await;
    std::fs::write(
        fixture.dir().join(".mcpkit-ready"),
        serde_json::to_string(&repo).unwrap(),
    )
    .unwrap();
    let moved = fixture.commit_file("moved.txt");

    fixture.later(REPO_CHECK_INTERVAL_MS);
    fixture.ensure(&repo, true).await;

    assert!(fixture.dir().join("moved.txt").exists());
    assert_eq!(fixture.state().await.commit, Some(moved));
}
