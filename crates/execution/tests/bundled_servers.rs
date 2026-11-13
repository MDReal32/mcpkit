use serde_json::{Map, Value, json};
use std::collections::HashSet;
use std::path::{Path, PathBuf};
use std::rc::Rc;
use url::Url;
use usemcpkit_auth::{AuthContext, AuthState};
use usemcpkit_core::env::Env;
use usemcpkit_execution::{CallContext, DEFAULT_TIMEOUT, ExecutorState, execute_tool};
use usemcpkit_http::{FormPart, FormValue, HttpRequest, RequestBody};
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::tool::HttpMethod;
use usemcpkit_openapi::build_tools;
use usemcpkit_openapi::merge::{HostSource, merge_tools};
use usemcpkit_testing::{FixedClient, json_response};

const JIRA_CLOUD: &[(&str, &str)] = &[
    ("JIRA_HOST", "acme.atlassian.net"),
    ("JIRA_USERNAME", "me@acme.com"),
    ("JIRA_API_TOKEN", "t"),
];

const JIRA_DATA_CENTER: &[(&str, &str)] = &[("JIRA_HOST", "jira.acme.com/jira"), ("JIRA_PERSONAL_TOKEN", "t")];

const CONFLUENCE_CLOUD: &[(&str, &str)] = &[
    ("CONFLUENCE_HOST", "acme.atlassian.net"),
    ("CONFLUENCE_USERNAME", "me"),
    ("CONFLUENCE_API_TOKEN", "t"),
];

const CLICKUP: &[(&str, &str)] = &[("CLICKUP_API_TOKEN", "pk_1_ABC")];

const DISCORD: &[(&str, &str)] = &[("DISCORD_BOT_TOKEN", "MTA.bot")];

const REDDIT: &[(&str, &str)] = &[("REDDIT_ACCESS_TOKEN", "t")];

const FIGMA: &[(&str, &str)] = &[("FIGMA_ACCESS_TOKEN", "figd_t")];

const N8N: &[(&str, &str)] = &[("N8N_HOST", "n8n.acme.com/automation"), ("N8N_API_KEY", "n8n_key")];

fn manifests_dir() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("../../packages/servers/build/manifests")
}

fn read_json(file: &Path) -> Value {
    serde_json::from_str(&std::fs::read_to_string(file).unwrap()).unwrap()
}

/// The built manifest `path` (`<category>/<name>`) with the tools its source `source` builds from `document` (an
/// excerpt of the real one, or a document the registry publishes) and its hand-written tools, as the CLI assembles a
/// server for a host that runs `version`.
fn built_server(path: &str, source: &str, document: &Value, version: Option<&str>) -> Manifest {
    let mut manifest: Manifest =
        serde_json::from_value(read_json(&manifests_dir().join(format!("{path}.json")))).unwrap();
    let spec = manifest
        .openapi
        .clone()
        .expect("the server builds its tools from OpenAPI");
    let source = spec
        .sources
        .iter()
        .find(|candidate| candidate.name == source)
        .unwrap_or_else(|| panic!("{path} has no source {source}"));
    let built = build_tools(document, source).unwrap();
    let host = HostSource {
        name: source.name.clone(),
        version: version.map(str::to_owned),
    };
    manifest.tools = merge_tools(vec![built.tools], &manifest.tools, &HashSet::new(), &[host]);
    manifest
}

/// A document with the `servers` of a real one and one operation, answering 200.
fn document(server: &str, path: &str, method: &str, operation: &Value) -> Value {
    let mut operation = operation.clone();
    operation["responses"] = json!({ "200": { "description": "OK" } });
    json!({
        "openapi": "3.0.1",
        "info": { "title": "excerpt", "version": "1" },
        "servers": [{ "url": server }],
        "paths": { path: { method: operation } },
    })
}

fn path_parameters(names: &[&str]) -> Value {
    Value::Array(
        names
            .iter()
            .map(|name| json!({ "name": name, "in": "path", "required": true, "schema": { "type": "string" } }))
            .collect(),
    )
}

fn json_body(properties: &Value) -> Value {
    json!({ "content": { "application/json": { "schema": { "type": "object", "properties": properties } } } })
}

/// Calls `tool_name` against an API that answers `{}`, and returns the one request it sent.
async fn send(manifest: &Manifest, tool_name: &str, args: Value, env: &[(&str, &str)]) -> HttpRequest {
    let home = tempfile::tempdir().unwrap();
    let http = Rc::new(FixedClient::new(json_response(200, &json!({}))));
    let context = CallContext {
        auth: AuthContext {
            env: Env::from_pairs(env.iter().copied()),
            home: home.path().to_path_buf(),
            http: http.clone(),
            on_authorization_url: None,
            project_dir: None,
            request_credentials: None,
            secret_store: None,
            state: Rc::new(AuthState::default()),
        },
        timeout: DEFAULT_TIMEOUT,
        state: Rc::new(ExecutorState::default()),
    };
    let tool = manifest
        .tools
        .iter()
        .find(|tool| tool.name == tool_name)
        .unwrap_or_else(|| panic!("{} has no tool {tool_name}", manifest.name));
    let args: Map<String, Value> = args.as_object().unwrap().clone();
    execute_tool(manifest, tool, Some(&args), &context)
        .await
        .map_err(|error| error.0)
        .unwrap();
    let requests = http.requests.borrow();
    assert_eq!(requests.len(), 1, "{tool_name} sends one request");
    requests[0].clone()
}

fn url(request: &HttpRequest) -> Url {
    Url::parse(&request.url).unwrap()
}

fn endpoint(request: &HttpRequest) -> String {
    let url = url(request);
    format!("{}{}", url.origin().ascii_serialization(), url.path())
}

fn query_values(request: &HttpRequest, key: &str) -> Vec<String> {
    url(request)
        .query_pairs()
        .filter(|(name, _)| name == key)
        .map(|(_, value)| value.into_owned())
        .collect()
}

fn query_value(request: &HttpRequest, key: &str) -> Option<String> {
    query_values(request, key).into_iter().next()
}

fn header<'a>(request: &'a HttpRequest, name: &str) -> Option<&'a str> {
    request
        .headers
        .iter()
        .find(|(key, _)| key.eq_ignore_ascii_case(name))
        .map(|(_, value)| value.as_str())
}

fn body(request: &HttpRequest) -> Value {
    match &request.body {
        Some(RequestBody::Text(text)) => serde_json::from_str(text).unwrap(),
        other => panic!("expected a JSON body, got {other:?}"),
    }
}

#[tokio::test]
async fn github_builds_dotcom_tools_under_the_api_host_and_sends_the_body() {
    let spec = document(
        "https://api.github.com",
        "/repos/{owner}/{repo}/issues",
        "post",
        &json!({
            "parameters": path_parameters(&["owner", "repo"]),
            "requestBody": json_body(&json!({ "title": { "type": "string" }, "labels": { "type": "array", "items": { "type": "string" } } })),
        }),
    );
    let github = built_server("git/github", "dotcom", &spec, None);

    let request = send(
        &github,
        "repos/{owner}/{repo}/issues:post",
        json!({ "owner": "acme", "repo": "app", "title": "Bug", "labels": ["x"] }),
        &[("GITHUB_TOKEN", "t")],
    )
    .await;

    assert_eq!(request.url, "https://api.github.com/repos/acme/app/issues");
    assert_eq!(body(&request), json!({ "title": "Bug", "labels": ["x"] }));
    assert_eq!(header(&request, "Authorization"), Some("Bearer t"));
}

#[tokio::test]
async fn github_enterprise_tools_keep_the_names_of_github_com_under_the_hosts_api_path() {
    let spec = document(
        "{protocol}://{hostname}/api/v3",
        "/repos/{owner}/{repo}/pulls",
        "get",
        &json!({ "parameters": path_parameters(&["owner", "repo"]) }),
    );
    let github = built_server("git/github", "enterprise", &spec, Some("3.14"));

    let request = send(
        &github,
        "repos/{owner}/{repo}/pulls:get",
        json!({ "owner": "acme", "repo": "app" }),
        &[("GITHUB_API_HOST", "ghe.acme.com/api/v3"), ("GITHUB_TOKEN", "t")],
    )
    .await;

    assert_eq!(request.url, "https://ghe.acme.com/api/v3/repos/acme/app/pulls");
}

#[tokio::test]
async fn github_downloads_a_release_asset_with_the_hand_written_tool() {
    let spec = document(
        "https://api.github.com",
        "/repos/{owner}/{repo}/releases/assets/{asset_id}",
        "get",
        &json!({ "parameters": path_parameters(&["owner", "repo", "asset_id"]) }),
    );
    let github = built_server("git/github", "dotcom", &spec, None);
    let dir = tempfile::tempdir().unwrap();
    let save_to = dir.path().join("asset.zip");

    let request = send(
        &github,
        "repos/{owner}/{repo}/releases/assets/{asset_id}:get",
        json!({ "owner": "acme", "repo": "app", "asset_id": 5, "save_to": save_to }),
        &[("GITHUB_TOKEN", "t")],
    )
    .await;

    assert_eq!(request.url, "https://api.github.com/repos/acme/app/releases/assets/5");
    assert_eq!(header(&request, "Accept"), Some("application/octet-stream"));
}

#[tokio::test]
async fn gitlab_encodes_the_project_path_under_the_api_of_the_configured_host() {
    let spec = json!({
        "swagger": "2.0",
        "info": { "title": "GitLab", "version": "v4" },
        "host": "gitlab.com",
        "paths": {
            "/api/v4/projects/{id}/merge_requests": {
                "get": {
                    "parameters": [
                        { "name": "id", "in": "path", "required": true, "type": "string" },
                        { "name": "state", "in": "query", "type": "string" },
                    ],
                    "responses": { "200": { "description": "OK" } },
                },
            },
        },
    });
    let gitlab = built_server("git/gitlab", "self-managed", &spec, Some("17.5.2"));

    let request = send(
        &gitlab,
        "api/v4/projects/{id}/merge_requests:get",
        json!({ "id": "group/app", "state": "opened" }),
        &[("GITLAB_HOST", "git.acme.com/gitlab"), ("GITLAB_TOKEN", "t")],
    )
    .await;

    assert_eq!(
        request.url,
        "https://git.acme.com/gitlab/api/v4/projects/group%2Fapp/merge_requests?state=opened"
    );
}

#[tokio::test]
async fn jira_cloud_creates_issues_through_rest_api_2() {
    let spec = document(
        "https://your-domain.atlassian.net",
        "/rest/api/2/issue",
        "post",
        &json!({ "requestBody": json_body(&json!({ "fields": { "type": "object", "properties": { "summary": { "type": "string" } } } })) }),
    );
    let jira = built_server("atlassian/jira", "cloud", &spec, None);

    let request = send(
        &jira,
        "rest/api/2/issue:post",
        json!({ "fields": { "summary": "Hi" } }),
        JIRA_CLOUD,
    )
    .await;

    assert_eq!(request.url, "https://acme.atlassian.net/rest/api/2/issue");
    assert_eq!(body(&request), json!({ "fields": { "summary": "Hi" } }));
}

#[tokio::test]
async fn jira_data_center_tools_take_the_cloud_names_and_keep_the_context_path() {
    let spec = document(
        "http://{baseurl}/rest",
        "/api/2/issue/{issueIdOrKey}/comment/{id}",
        "delete",
        &json!({ "parameters": path_parameters(&["issueIdOrKey", "id"]) }),
    );
    let jira = built_server("atlassian/jira", "datacenter", &spec, Some("10.3"));

    let request = send(
        &jira,
        "rest/api/2/issue/{issueIdOrKey}/comment/{id}:delete",
        json!({ "issueIdOrKey": "A-1", "id": "10" }),
        JIRA_DATA_CENTER,
    )
    .await;

    assert_eq!(request.method, HttpMethod::Delete);
    assert_eq!(
        request.url,
        "https://jira.acme.com/jira/rest/api/2/issue/A-1/comment/10"
    );
    assert_eq!(header(&request, "Authorization"), Some("Bearer t"));
}

#[tokio::test]
async fn jira_data_center_downloads_attachments_from_the_servlet() {
    let spec = document("http://{baseurl}/rest", "/api/2/serverInfo", "get", &json!({}));
    let jira = built_server("atlassian/jira", "datacenter", &spec, Some("10.3"));
    let dir = tempfile::tempdir().unwrap();

    let request = send(
        &jira,
        "rest/api/2/attachment/content/{id}:get",
        json!({ "id": "7", "filename": "a b.png", "save_to": dir.path().join("a.png") }),
        JIRA_DATA_CENTER,
    )
    .await;

    assert_eq!(request.url, "https://jira.acme.com/jira/secure/attachment/7/a%20b.png");
    let cloud = built_server("atlassian/jira", "cloud", &spec, None);
    assert!(
        !cloud
            .tools
            .iter()
            .any(|tool| tool.name == "rest/api/2/attachment/content/{id}:get")
    );
}

#[tokio::test]
async fn jira_data_center_uploads_attachments_as_file_parts() {
    let mut operation = json!({ "parameters": path_parameters(&["issueIdOrKey"]) });
    operation["requestBody"] =
        json!({ "content": { "multipart/form-data": { "schema": { "type": "string", "format": "binary" } } } });
    let spec = document(
        "http://{baseurl}/rest",
        "/api/2/issue/{issueIdOrKey}/attachments",
        "post",
        &operation,
    );
    let jira = built_server("atlassian/jira", "datacenter", &spec, Some("10.3"));
    let dir = tempfile::tempdir().unwrap();
    let file = dir.path().join("notes.txt");
    std::fs::write(&file, "hi").unwrap();

    let request = send(
        &jira,
        "rest/api/2/issue/{issueIdOrKey}/attachments:post",
        json!({ "issueIdOrKey": "A-1", "file": [file] }),
        JIRA_DATA_CENTER,
    )
    .await;

    assert_eq!(
        request.url,
        "https://jira.acme.com/jira/rest/api/2/issue/A-1/attachments"
    );
    assert_eq!(
        request.body,
        Some(RequestBody::Form(vec![FormPart {
            name: "file".into(),
            value: FormValue::File {
                file_name: "notes.txt".into(),
                data: b"hi".to_vec(),
            },
        }]))
    );
}

#[tokio::test]
async fn jira_data_center_9_has_hand_written_core_tools_of_the_names_10_builds() {
    let empty = json!({
        "openapi": "3.0.1",
        "info": { "title": "none", "version": "1" },
        "servers": [{ "url": "http://{baseurl}/rest" }],
        "paths": {},
    });
    let jira = built_server("atlassian/jira", "datacenter", &empty, Some("9.4"));

    let request = send(
        &jira,
        "rest/api/2/search:get",
        json!({ "jql": "project = VOEN", "maxResults": 5 }),
        JIRA_DATA_CENTER,
    )
    .await;

    assert_eq!(request.method, HttpMethod::Get);
    assert_eq!(endpoint(&request), "https://jira.acme.com/jira/rest/api/2/search");
    assert_eq!(query_value(&request, "jql").as_deref(), Some("project = VOEN"));
    assert_eq!(query_value(&request, "maxResults").as_deref(), Some("5"));
    assert_eq!(jira.tools.len(), 27);
    let ten = built_server("atlassian/jira", "datacenter", &empty, Some("10.0"));
    assert_eq!(
        ten.tools.iter().map(|tool| tool.name.as_str()).collect::<Vec<_>>(),
        [
            "rest/api/2/attachment/content/{id}:get",
            "rest/api/2/attachment/thumbnail/{id}:get"
        ]
    );
}

#[tokio::test]
async fn confluence_cloud_reaches_v2_under_wiki_api_v2_and_renames_hyphenated_parameters() {
    let spec = document(
        "https://{your-domain}/wiki/api/v2",
        "/pages/{page-id}/properties",
        "get",
        &json!({ "parameters": path_parameters(&["page-id"]) }),
    );
    let confluence = built_server("atlassian/confluence", "cloud", &spec, None);

    let request = send(
        &confluence,
        "wiki/api/v2/pages/{page-id}/properties:get",
        json!({ "page_id": "7" }),
        CONFLUENCE_CLOUD,
    )
    .await;

    assert_eq!(request.url, "https://acme.atlassian.net/wiki/api/v2/pages/7/properties");
}

#[tokio::test]
async fn confluence_cloud_reaches_v1_under_wiki_rest_api() {
    let spec = document(
        "//your-domain.atlassian.net",
        "/wiki/rest/api/content/{id}",
        "get",
        &json!({ "parameters": path_parameters(&["id"]) }),
    );
    let confluence = built_server("atlassian/confluence", "cloud-v1", &spec, None);

    let request = send(
        &confluence,
        "wiki/rest/api/content/{id}:get",
        json!({ "id": "7" }),
        CONFLUENCE_CLOUD,
    )
    .await;

    assert_eq!(request.url, "https://acme.atlassian.net/wiki/rest/api/content/7");
}

#[tokio::test]
async fn confluence_data_center_keeps_the_context_path_of_the_host() {
    let spec = document(
        "http://{baseurl}/confluence",
        "/rest/api/content/{id}",
        "get",
        &json!({
            "parameters": [
                { "name": "id", "in": "path", "required": true, "schema": { "type": "string" } },
                { "name": "expand", "in": "query", "schema": { "type": "string" } },
            ],
        }),
    );
    let confluence = built_server("atlassian/confluence", "datacenter", &spec, Some("10.2"));

    let request = send(
        &confluence,
        "rest/api/content/{id}:get",
        json!({ "id": "7", "expand": "body.storage" }),
        &[
            ("CONFLUENCE_HOST", "wiki.acme.com/confluence"),
            ("CONFLUENCE_PERSONAL_TOKEN", "t"),
        ],
    )
    .await;

    assert_eq!(
        request.url,
        "https://wiki.acme.com/confluence/rest/api/content/7?expand=body.storage"
    );
}

#[tokio::test]
async fn clickup_reaches_v2_and_v3_under_the_api_host_with_the_raw_token() {
    let v2 = document(
        "https://api.clickup.com/api",
        "/v2/task/{task_id}",
        "get",
        &json!({ "parameters": path_parameters(&["task_id"]) }),
    );
    let v3 = json!({
        "openapi": "3.0.0",
        "info": { "title": "v3", "version": "3" },
        "paths": {
            "/api/v3/workspaces/{workspace_id}/docs": {
                "get": { "parameters": path_parameters(&["workspace_id"]), "responses": { "200": { "description": "OK" } } },
            },
        },
    });

    let task = send(
        &built_server("productivity/clickup", "v2", &v2, None),
        "api/v2/task/{task_id}:get",
        json!({ "task_id": "abc" }),
        CLICKUP,
    )
    .await;
    let docs = send(
        &built_server("productivity/clickup", "v3", &v3, None),
        "api/v3/workspaces/{workspace_id}/docs:get",
        json!({ "workspace_id": "9" }),
        CLICKUP,
    )
    .await;

    assert_eq!(task.url, "https://api.clickup.com/api/v2/task/abc");
    assert_eq!(header(&task, "Authorization"), Some("pk_1_ABC"));
    assert_eq!(docs.url, "https://api.clickup.com/api/v3/workspaces/9/docs");
}

#[tokio::test]
async fn discord_posts_a_message_as_the_bot() {
    let spec = document(
        "https://discord.com/api/v10",
        "/channels/{channel_id}/messages",
        "post",
        &json!({
            "parameters": path_parameters(&["channel_id"]),
            "requestBody": json_body(&json!({ "content": { "type": "string" } })),
        }),
    );
    let discord = built_server("communication/discord", "v10", &spec, None);

    let request = send(
        &discord,
        "channels/{channel_id}/messages:post",
        json!({ "channel_id": "1", "content": "hi" }),
        DISCORD,
    )
    .await;

    assert_eq!(request.url, "https://discord.com/api/v10/channels/1/messages");
    assert_eq!(header(&request, "Authorization"), Some("Bot MTA.bot"));
}

#[tokio::test]
async fn figma_reads_nodes_of_a_file_with_the_token_in_x_figma_token() {
    let spec = document(
        "https://api.figma.com",
        "/v1/files/{file_key}/nodes",
        "get",
        &json!({
            "parameters": [
                { "name": "file_key", "in": "path", "required": true, "schema": { "type": "string" } },
                { "name": "ids", "in": "query", "required": true, "schema": { "type": "string" } },
            ],
        }),
    );
    let figma = built_server("design/figma", "rest", &spec, None);

    let request = send(
        &figma,
        "v1/files/{file_key}/nodes:get",
        json!({ "file_key": "K", "ids": "1:2" }),
        FIGMA,
    )
    .await;

    assert_eq!(endpoint(&request), "https://api.figma.com/v1/files/K/nodes");
    assert_eq!(query_value(&request, "ids").as_deref(), Some("1:2"));
    assert_eq!(header(&request, "X-Figma-Token"), Some("figd_t"));
}

#[tokio::test]
async fn n8n_lists_workflows_of_a_self_hosted_instance_and_reaches_a_local_one_over_http() {
    let spec = document("/api/v1", "/workflows", "get", &json!({}));
    let n8n = built_server("automation/n8n", "public-api", &spec, None);

    let hosted = send(&n8n, "workflows:get", json!({}), N8N).await;
    let local = send(
        &n8n,
        "workflows:get",
        json!({}),
        &[("N8N_HOST", "localhost:5678"), ("N8N_API_KEY", "k")],
    )
    .await;

    assert_eq!(hosted.url, "https://n8n.acme.com/automation/api/v1/workflows");
    assert_eq!(header(&hosted, "X-N8N-API-KEY"), Some("n8n_key"));
    assert_eq!(local.url, "http://localhost:5678/api/v1/workflows");
}

#[tokio::test]
async fn reddit_lists_a_subreddits_posts_from_its_published_document() {
    let spec = read_json(&manifests_dir().join("communication/reddit/openapi.json"));
    let reddit = built_server("communication/reddit", "oauth", &spec, None);

    let request = send(
        &reddit,
        "r/{subreddit}/{sort}:get",
        json!({ "subreddit": "rust", "sort": "hot" }),
        REDDIT,
    )
    .await;

    assert_eq!(endpoint(&request), "https://oauth.reddit.com/r/rust/hot");
    assert!(header(&request, "User-Agent").is_some_and(|agent| agent.starts_with("usemcpkit:")));
}

#[tokio::test]
async fn medium_reads_the_token_owner_from_its_published_document() {
    let spec = read_json(&manifests_dir().join("communication/medium/openapi.json"));
    let medium = built_server("communication/medium", "v1", &spec, None);

    let request = send(&medium, "me:get", json!({}), &[("MEDIUM_INTEGRATION_TOKEN", "t")]).await;

    assert_eq!(request.url, "https://api.medium.com/v1/me");
}
