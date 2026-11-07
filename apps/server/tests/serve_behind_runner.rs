mod support;

use serde_json::{Value, json};
use std::path::Path;
use std::time::Duration;
use support::registry_root;
use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader, DuplexStream, Lines};
use usemcpkit_runner::supervisor::{SuperviseOptions, WorkerLaunch, supervise_serve};

/// The server's cache as `usemcpkit update` and a first look at GitHub leave it, so nothing is fetched while serving.
fn seed_home(home: &Path) {
    for file in ["index.json", "git/github.json"] {
        let target = home.join("manifests").join(file);
        std::fs::create_dir_all(target.parent().unwrap()).unwrap();
        std::fs::copy(registry_root().join(file), target).unwrap();
    }
}

async fn send(client: &mut DuplexStream, message: Value) {
    client.write_all(format!("{message}\n").as_bytes()).await.unwrap();
}

async fn receive(responses: &mut Lines<BufReader<DuplexStream>>) -> Value {
    let line = tokio::time::timeout(Duration::from_secs(20), responses.next_line())
        .await
        .expect("no line from the runner within 20 s")
        .unwrap()
        .expect("the runner closed its output");
    serde_json::from_str(&line).unwrap()
}

#[tokio::test]
async fn searches_the_tools_through_the_runner() {
    let home = tempfile::tempdir().unwrap();
    seed_home(home.path());
    let launch = WorkerLaunch {
        command: env!("CARGO_BIN_EXE_usemcpkit-servers").into(),
        args: vec!["serve".into(), "--worker".into()],
        env: vec![
            ("USEMCPKIT_HOME".into(), home.path().into()),
            ("USEMCPKIT_REGISTRY".into(), "http://127.0.0.1:9".into()),
            ("USEMCPKIT_DEBUG".into(), "0".into()),
        ],
    };
    let (mut client, input) = tokio::io::duplex(1 << 20);
    let (output, responses) = tokio::io::duplex(1 << 20);
    let mut responses = BufReader::new(responses).lines();
    let options = SuperviseOptions {
        input: Box::new(input),
        output: Box::new(output),
        ..SuperviseOptions::default()
    };
    let runner = tokio::spawn(supervise_serve(launch, options));

    send(
        &mut client,
        json!({ "jsonrpc": "2.0", "id": 0, "method": "initialize", "params": { "protocolVersion": "2025-03-26" } }),
    )
    .await;
    let initialized = receive(&mut responses).await;
    send(
        &mut client,
        json!({ "jsonrpc": "2.0", "method": "notifications/initialized" }),
    )
    .await;
    send(
        &mut client,
        json!({ "jsonrpc": "2.0", "id": 1, "method": "tools/list" }),
    )
    .await;
    let listed = receive(&mut responses).await;
    send(
        &mut client,
        json!({
            "jsonrpc": "2.0",
            "id": 2,
            "method": "tools/call",
            "params": { "name": "search", "arguments": { "code": "async () => codemode.groups(\"git:github\")" } },
        }),
    )
    .await;
    let searched = receive(&mut responses).await;
    drop(client);
    let code = tokio::time::timeout(Duration::from_secs(20), runner)
        .await
        .unwrap()
        .unwrap();

    assert_eq!(initialized["result"]["protocolVersion"], json!("2025-03-26"));
    assert_eq!(initialized["result"]["serverInfo"]["name"], json!("usemcpkit"));
    let names: Vec<&str> = listed["result"]["tools"]
        .as_array()
        .unwrap()
        .iter()
        .map(|tool| tool["name"].as_str().unwrap())
        .collect();
    assert_eq!(names, ["search", "execute"]);
    assert_eq!(searched["id"], json!(2));
    assert_eq!(searched["result"].get("isError"), None, "{searched}");
    let groups = searched["result"]["content"][0]["text"].as_str().unwrap();
    assert!(groups.contains("\"repos\""), "{groups}");
    assert_eq!(code, 0);
}
