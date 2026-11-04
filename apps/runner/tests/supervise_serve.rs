use serde_json::{Value, json};
use std::path::Path;
use std::time::Duration;
use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader, DuplexStream, Lines};
use tokio::task::JoinHandle;
use usemcpkit_runner::supervisor::{SuperviseOptions, WorkerLaunch, supervise_serve};

/// A worker in Node that answers every request with the version written in `version_file` when it started, and exits
/// with code 3 once its input closes.
const FAKE_WORKER: &str = r#"
const version = require("node:fs").readFileSync(process.argv[1], "utf8").trim();
if (version === "broken") process.exit(9);
require("node:readline").createInterface({ input: process.stdin }).on("line", (line) => {
  const message = JSON.parse(line);
  if (message.id === undefined) return;
  const result = message.method === "initialize" ? { serverInfo: { version } } : { from: version };
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: message.id, result }) + "\n");
}).on("close", () => process.exit(3));
"#;

struct Harness {
    client: DuplexStream,
    responses: Lines<BufReader<DuplexStream>>,
    supervisor: JoinHandle<i32>,
}

impl Harness {
    fn start(version_file: &Path) -> Self {
        let (client, input) = tokio::io::duplex(64 * 1024);
        let (output, responses) = tokio::io::duplex(64 * 1024);
        let launch = WorkerLaunch {
            command: "node".into(),
            args: vec!["-e".into(), FAKE_WORKER.into(), version_file.display().to_string()],
            env: Vec::new(),
        };
        let options = SuperviseOptions {
            input: Box::new(input),
            output: Box::new(output),
            watch_path: Some(version_file.to_path_buf()),
            poll_interval: Duration::from_millis(50),
            ..SuperviseOptions::default()
        };
        Harness {
            client,
            responses: BufReader::new(responses).lines(),
            supervisor: tokio::spawn(supervise_serve(launch, options)),
        }
    }

    async fn send(&mut self, message: Value) {
        self.client.write_all(format!("{message}\n").as_bytes()).await.unwrap();
    }

    async fn receive(&mut self) -> Value {
        let line = tokio::time::timeout(Duration::from_secs(10), self.responses.next_line())
            .await
            .expect("no line from the supervisor within 10 s")
            .unwrap()
            .expect("the supervisor closed its output");
        serde_json::from_str(&line).unwrap()
    }

    async fn close(self) -> i32 {
        drop(self.client);
        tokio::time::timeout(Duration::from_secs(10), self.supervisor)
            .await
            .unwrap()
            .unwrap()
    }
}

fn write_version(path: &Path, version: &str) {
    std::fs::write(path, version).unwrap();
}

async fn initialize(harness: &mut Harness) {
    harness
        .send(json!({ "jsonrpc": "2.0", "id": 0, "method": "initialize", "params": {} }))
        .await;
    assert_eq!(harness.receive().await["result"]["serverInfo"]["version"], json!("1"));
    harness
        .send(json!({ "jsonrpc": "2.0", "method": "notifications/initialized" }))
        .await;
}

#[tokio::test]
async fn forwards_both_ways_and_exits_with_the_worker_code() {
    let dir = tempfile::tempdir().unwrap();
    let version_file = dir.path().join("version");
    write_version(&version_file, "1");
    let mut harness = Harness::start(&version_file);

    initialize(&mut harness).await;
    harness
        .send(json!({ "jsonrpc": "2.0", "id": 1, "method": "tools/list" }))
        .await;

    assert_eq!(
        harness.receive().await,
        json!({ "jsonrpc": "2.0", "id": 1, "result": { "from": "1" } })
    );
    assert_eq!(harness.close().await, 3);
}

#[tokio::test]
async fn swaps_the_worker_when_the_binary_changes() {
    let dir = tempfile::tempdir().unwrap();
    let version_file = dir.path().join("version");
    write_version(&version_file, "1");
    let mut harness = Harness::start(&version_file);
    initialize(&mut harness).await;

    write_version(&version_file, "2");

    assert_eq!(
        harness.receive().await,
        json!({ "jsonrpc": "2.0", "method": "notifications/tools/list_changed" })
    );
    harness
        .send(json!({ "jsonrpc": "2.0", "id": 5, "method": "tools/list" }))
        .await;
    assert_eq!(harness.receive().await["result"]["from"], json!("2"));
    assert_eq!(harness.close().await, 3);
}

#[tokio::test]
async fn keeps_the_running_worker_when_the_replacement_fails() {
    let dir = tempfile::tempdir().unwrap();
    let version_file = dir.path().join("version");
    write_version(&version_file, "1");
    let mut harness = Harness::start(&version_file);
    initialize(&mut harness).await;

    write_version(&version_file, "broken");
    tokio::time::sleep(Duration::from_millis(600)).await;
    harness
        .send(json!({ "jsonrpc": "2.0", "id": 6, "method": "tools/list" }))
        .await;

    assert_eq!(harness.receive().await["result"]["from"], json!("1"));
    assert_eq!(harness.close().await, 3);
}
