use indexmap::IndexMap;
use serde_json::{Map, Value, json};
use std::rc::Rc;
use usemcpkit_core::env::Env;
use usemcpkit_http::HttpResponse;
use usemcpkit_manifest::upstream::{StdioUpstream, UpstreamSpec};
use usemcpkit_testing::FixedClient;
use usemcpkit_upstream::{UpstreamConnection, UpstreamError, UpstreamOptions, connect_upstream};

const FAKE_UPSTREAM: &str = env!("CARGO_BIN_EXE_fake-upstream");

fn stdio(command: &str) -> UpstreamSpec {
    UpstreamSpec::Stdio(Box::new(StdioUpstream {
        command: command.to_owned(),
        args: None,
        forward_env: None,
        optional_env: None,
        ui: None,
        repo: None,
        naming: None,
    }))
}

fn options(process_env: Env, env: &[(&str, &str)]) -> UpstreamOptions {
    let mut options = UpstreamOptions::new(Rc::new(FixedClient::new(HttpResponse::default())), process_env);
    options.env = env
        .iter()
        .map(|(name, value)| ((*name).to_owned(), (*value).to_owned()))
        .collect::<IndexMap<_, _>>();
    options
}

async fn connect(env: &[(&str, &str)]) -> UpstreamConnection {
    connect_upstream(&stdio(FAKE_UPSTREAM), &options(Env::from_process(), env))
        .await
        .unwrap()
}

fn arguments(value: Value) -> Option<Map<String, Value>> {
    value.as_object().cloned()
}

fn names(tools: &[Value]) -> Vec<&str> {
    tools.iter().filter_map(|tool| tool["name"].as_str()).collect()
}

#[tokio::test]
async fn lists_the_tools_of_every_page() {
    let connection = connect(&[]).await;

    let tools = connection.list_tools().await.unwrap();
    connection.close().await;

    assert_eq!(names(&tools), ["echo", "whoami"]);
    assert_eq!(
        tools[0]["inputSchema"]["properties"]["text"],
        json!({ "type": "string" })
    );
}

#[tokio::test]
async fn calls_a_tool_with_its_arguments() {
    let connection = connect(&[]).await;

    let result = connection.call_tool("echo", arguments(json!({ "text": "hi" }))).await;
    connection.close().await;

    assert_eq!(result, Ok(json!({ "content": [{ "type": "text", "text": "hi" }] })));
}

#[tokio::test]
async fn hands_the_child_only_the_environment_it_was_given() {
    let leaky = Env::from_process().with("TOKEN", "from-usemcpkit");
    let given = connect_upstream(&stdio(FAKE_UPSTREAM), &options(leaky.clone(), &[("TOKEN", "secret-1")]))
        .await
        .unwrap();
    let none = connect_upstream(&stdio(FAKE_UPSTREAM), &options(leaky, &[]))
        .await
        .unwrap();

    let given_result = given.call_tool("whoami", None).await.unwrap();
    let none_result = none.call_tool("whoami", None).await.unwrap();
    let inherited = none
        .call_tool("env", arguments(json!({ "name": "CARGO_MANIFEST_DIR" })))
        .await
        .unwrap();
    given.close().await;
    none.close().await;

    assert_eq!(given_result["content"][0]["text"], "secret-1");
    assert_eq!(none_result["content"][0]["text"], "undefined");
    assert_eq!(
        inherited["content"][0]["text"], "undefined",
        "cargo sets it for this test process only"
    );
}

#[tokio::test]
async fn answers_concurrent_calls_on_one_connection() {
    let connection = connect(&[]).await;

    let (first, second) = tokio::join!(
        connection.call_tool("echo", arguments(json!({ "text": "one" }))),
        connection.call_tool("echo", arguments(json!({ "text": "two" }))),
    );
    connection.close().await;

    assert_eq!(first.unwrap()["content"][0]["text"], "one");
    assert_eq!(second.unwrap()["content"][0]["text"], "two");
}

#[tokio::test]
async fn is_closed_after_close_and_refuses_further_calls() {
    let connection = connect(&[]).await;

    connection.close().await;
    let refused = connection.call_tool("echo", arguments(json!({ "text": "late" }))).await;

    assert!(refused.is_err(), "{refused:?}");
    for _ in 0..100 {
        if !connection.is_open() {
            return;
        }
        tokio::time::sleep(std::time::Duration::from_millis(20)).await;
    }
    panic!("the connection still reads as open after close");
}

#[tokio::test]
async fn fails_with_the_reason_when_the_command_cannot_start() {
    let failed = connect_upstream(&stdio("usemcpkit-no-such-program"), &options(Env::from_process(), &[])).await;

    assert!(
        matches!(&failed, Err(UpstreamError::Failed(message)) if message.starts_with("could not start \"usemcpkit-no-such-program\"")),
        "{:?}",
        failed.err()
    );
}

#[tokio::test]
async fn fails_waiting_requests_with_the_exit_code_when_the_child_exits() {
    let spec = UpstreamSpec::Stdio(Box::new(StdioUpstream {
        args: Some(vec!["fail".to_owned()]),
        ..match stdio(FAKE_UPSTREAM) {
            UpstreamSpec::Stdio(spec) => *spec,
            UpstreamSpec::Http(_) => unreachable!(),
        }
    }));

    let failed = connect_upstream(&spec, &options(Env::from_process(), &[])).await;

    assert_eq!(
        failed
            .err()
            .map(|error| error.message().ends_with("exited with code 3")),
        Some(true)
    );
}
