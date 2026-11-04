use serde_json::{Map, Value, json};
use std::path::{Path, PathBuf};
use std::rc::Rc;
use url::Url;
use usemcpkit_auth::{AuthContext, AuthState};
use usemcpkit_core::env::Env;
use usemcpkit_execution::{CallContext, DEFAULT_TIMEOUT, ExecutorState, execute_tool};
use usemcpkit_http::{HttpRequest, RequestBody};
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::tool::HttpMethod;
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

const CONFLUENCE_DATA_CENTER: &[(&str, &str)] =
    &[("CONFLUENCE_HOST", "wiki.acme.com"), ("CONFLUENCE_PERSONAL_TOKEN", "t")];

const GITLAB: &[(&str, &str)] = &[("GITLAB_TOKEN", "t")];

const CLICKUP: &[(&str, &str)] = &[("CLICKUP_API_TOKEN", "pk_1_ABC")];

const DISCORD: &[(&str, &str)] = &[("DISCORD_BOT_TOKEN", "MTA.bot")];

const REDDIT: &[(&str, &str)] = &[("REDDIT_ACCESS_TOKEN", "t")];

fn manifests_dir() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("../../packages/servers/build/manifests")
}

fn read_json(file: &Path) -> Value {
    serde_json::from_str(&std::fs::read_to_string(file).unwrap()).unwrap()
}

/// The built manifest `path` (`<category>/<name>`) with the tools of all its parts, as the CLI assembles a server.
fn built_server(path: &str) -> Manifest {
    let mut shell = read_json(&manifests_dir().join(format!("{path}.json")));
    let parts = shell
        .as_object_mut()
        .unwrap()
        .remove("parts")
        .expect("the server is split into parts");
    let mut tools = Vec::new();
    for part in parts.as_array().unwrap() {
        let name = part["name"].as_str().unwrap();
        let file = manifests_dir().join(format!("{path}/{name}.json"));
        tools.extend(read_json(&file)["tools"].as_array().unwrap().iter().cloned());
    }
    shell["tools"] = Value::Array(tools);
    serde_json::from_value(shell).unwrap()
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
async fn github_fills_path_and_query_parameters_and_sends_the_body_under_renamed_keys() {
    let github = built_server("git/github");
    let env = &[("GITHUB_TOKEN", "t")];

    let content = send(
        &github,
        "repos:repos:get_content",
        json!({ "owner": "a", "repo": "b", "path": "x", "ref": "dev" }),
        env,
    )
    .await;
    let created = send(
        &github,
        "issues:issues:create",
        json!({ "owner": "a", "repo": "b", "title": "T", "labels": ["bug"] }),
        env,
    )
    .await;

    assert_eq!(content.url, "https://api.github.com/repos/a/b/contents/x?ref=dev");
    assert_eq!(created.method, HttpMethod::Post);
    assert_eq!(body(&created), json!({ "title": "T", "labels": ["bug"] }));
}

#[tokio::test]
async fn gitlab_encodes_the_project_path_and_targets_the_api_of_the_configured_host() {
    let gitlab = built_server("git/gitlab");

    let saas = send(
        &gitlab,
        "projects:projects:get_projects_issues",
        json!({ "id": "acme/app", "issue_iid": 7 }),
        GITLAB,
    )
    .await;
    let self_managed = send(
        &gitlab,
        "projects:projects:list_projects_issues",
        json!({ "id": "acme/sub/app", "state": "opened" }),
        &[("GITLAB_HOST", "git.acme.com/gitlab"), ("GITLAB_TOKEN", "t")],
    )
    .await;

    assert_eq!(saas.url, "https://gitlab.com/api/v4/projects/acme%2Fapp/issues/7");
    assert_eq!(
        endpoint(&self_managed),
        "https://git.acme.com/gitlab/api/v4/projects/acme%2Fsub%2Fapp/issues"
    );
    assert_eq!(query_value(&self_managed, "state").as_deref(), Some("opened"));
}

#[tokio::test]
async fn gitlab_lists_projects_and_posts_comment_bodies() {
    let gitlab = built_server("git/gitlab");

    let projects = send(
        &gitlab,
        "projects:projects:list_projects",
        json!({ "search": "app", "membership": true }),
        GITLAB,
    )
    .await;
    let comment = send(
        &gitlab,
        "issues:notes:create_projects_merge_requests_notes",
        json!({ "id": "acme/app", "noteable_id": 3, "body": "LGTM" }),
        GITLAB,
    )
    .await;

    assert_eq!(query_value(&projects, "membership").as_deref(), Some("true"));
    assert_eq!(comment.method, HttpMethod::Post);
    assert_eq!(
        comment.url,
        "https://gitlab.com/api/v4/projects/acme%2Fapp/merge_requests/3/notes"
    );
    assert_eq!(body(&comment)["body"], "LGTM");
}

#[tokio::test]
async fn jira_searches_with_the_endpoint_of_each_edition() {
    let jira = built_server("atlassian/jira");
    let search = "issues:issue_search:search_and_reconsile_issues_using_jql";

    let cloud = send(
        &jira,
        search,
        json!({ "jql": "project = A", "maxResults": 10, "nextPageToken": "abc" }),
        JIRA_CLOUD,
    )
    .await;
    let data_center = send(
        &jira,
        search,
        json!({ "jql": "project = A", "maxResults": 10, "startAt": 5 }),
        JIRA_DATA_CENTER,
    )
    .await;

    assert_eq!(endpoint(&cloud), "https://acme.atlassian.net/rest/api/2/search/jql");
    assert_eq!(query_value(&cloud, "jql").as_deref(), Some("project = A"));
    assert_eq!(query_value(&cloud, "nextPageToken").as_deref(), Some("abc"));
    assert_eq!(query_value(&cloud, "startAt"), None);
    assert_eq!(endpoint(&data_center), "https://jira.acme.com/jira/rest/api/2/search");
    assert_eq!(query_value(&data_center, "startAt").as_deref(), Some("5"));
    assert_eq!(query_value(&data_center, "nextPageToken"), None);
}

#[tokio::test]
async fn jira_posts_the_search_body_to_the_endpoint_of_each_edition() {
    let jira = built_server("atlassian/jira");
    let search = "issues:issue_search:search_and_reconsile_issues_using_jql_post";

    let cloud = send(&jira, search, json!({ "jql": "project = A" }), JIRA_CLOUD).await;
    let data_center = send(&jira, search, json!({ "jql": "project = A" }), JIRA_DATA_CENTER).await;

    assert_eq!(cloud.method, HttpMethod::Post);
    assert_eq!(cloud.url, "https://acme.atlassian.net/rest/api/2/search/jql");
    assert_eq!(data_center.method, HttpMethod::Post);
    assert_eq!(data_center.url, "https://jira.acme.com/jira/rest/api/2/search");
    assert_eq!(body(&data_center)["jql"], "project = A");
}

#[tokio::test]
async fn jira_sends_the_create_issue_fields_object_as_the_nested_body() {
    let jira = built_server("atlassian/jira");
    let fields = json!({ "project": { "key": "A" }, "summary": "Broken", "issuetype": { "name": "Task" } });

    let request = send(
        &jira,
        "issues:issues:create_issue",
        json!({ "fields": fields }),
        JIRA_DATA_CENTER,
    )
    .await;

    assert_eq!(request.method, HttpMethod::Post);
    assert_eq!(endpoint(&request), "https://jira.acme.com/jira/rest/api/2/issue");
    assert_eq!(body(&request), json!({ "fields": fields }));
}

#[tokio::test]
async fn jira_lists_agile_boards_from_the_agile_endpoint() {
    let jira = built_server("atlassian/jira");

    let request = send(&jira, "software:board:get_all_boards", json!({}), JIRA_CLOUD).await;

    assert_eq!(endpoint(&request), "https://acme.atlassian.net/rest/agile/1.0/board");
}

#[tokio::test]
async fn jira_deletes_a_comment_by_issue_key_and_comment_id() {
    let jira = built_server("atlassian/jira");

    let request = send(
        &jira,
        "issues:issue_comments:delete_comment",
        json!({ "issueIdOrKey": "A-1", "id": "10" }),
        JIRA_DATA_CENTER,
    )
    .await;

    assert_eq!(request.method, HttpMethod::Delete);
    assert_eq!(
        request.url,
        "https://jira.acme.com/jira/rest/api/2/issue/A-1/comment/10"
    );
}

#[tokio::test]
async fn clickup_sends_the_personal_token_as_the_raw_authorization_header() {
    let clickup = built_server("productivity/clickup");

    let request = send(&clickup, "tasks:tasks:get_task", json!({ "task_id": "abc" }), CLICKUP).await;

    assert_eq!(request.url, "https://api.clickup.com/api/v2/task/abc");
    assert_eq!(header(&request, "Authorization"), Some("pk_1_ABC"));
}

#[tokio::test]
async fn clickup_repeats_array_filters_under_their_bracketed_names_and_keeps_json_filters_whole() {
    let clickup = built_server("productivity/clickup");
    let custom_fields = r#"[{"field_id":"f","operator":"=","value":"1"}]"#;

    let request = send(
        &clickup,
        "tasks:tasks:get_tasks",
        json!({ "list_id": 7, "statuses": ["to do", "in progress"], "custom_fields": custom_fields }),
        CLICKUP,
    )
    .await;

    assert_eq!(url(&request).path(), "/api/v2/list/7/task");
    assert_eq!(query_values(&request, "statuses[]"), ["to do", "in progress"]);
    assert_eq!(query_value(&request, "custom_fields").as_deref(), Some(custom_fields));
}

#[tokio::test]
async fn clickup_fills_the_workspace_placeholder_of_team_level_v2_paths() {
    let clickup = built_server("productivity/clickup");

    let request = send(
        &clickup,
        "time:time_tracking:get_time_entries_within_a_date_range",
        json!({ "team_Id": 9 }),
        CLICKUP,
    )
    .await;

    assert_eq!(request.url, "https://api.clickup.com/api/v2/team/9/time_entries");
}

#[tokio::test]
async fn clickup_reaches_the_v3_api_under_the_same_base_url() {
    let clickup = built_server("productivity/clickup");

    let request = send(
        &clickup,
        "docs:docs:search_for_docs",
        json!({ "workspace_id": "9", "limit": 5 }),
        CLICKUP,
    )
    .await;

    assert_eq!(endpoint(&request), "https://api.clickup.com/api/v3/workspaces/9/docs");
    assert_eq!(query_value(&request, "limit").as_deref(), Some("5"));
}

#[tokio::test]
async fn discord_posts_a_message_as_the_bot() {
    let discord = built_server("communication/discord");

    let request = send(
        &discord,
        "channels:messages:create_message",
        json!({ "channel_id": "123", "content": "hi" }),
        DISCORD,
    )
    .await;

    assert_eq!(request.method, HttpMethod::Post);
    assert_eq!(request.url, "https://discord.com/api/v10/channels/123/messages");
    assert_eq!(body(&request), json!({ "content": "hi" }));
    assert_eq!(header(&request, "Authorization"), Some("Bot MTA.bot"));
}

#[tokio::test]
async fn discord_repeats_search_filter_arrays_as_one_query_key_per_item() {
    let discord = built_server("communication/discord");

    let request = send(
        &discord,
        "guilds:messages:guild_search",
        json!({ "guild_id": "1", "author_id": ["2", "3"] }),
        DISCORD,
    )
    .await;

    assert_eq!(url(&request).path(), "/api/v10/guilds/1/messages/search");
    assert_eq!(query_values(&request, "author_id"), ["2", "3"]);
}

#[tokio::test]
async fn discord_encodes_a_custom_emoji_in_the_reaction_path() {
    let discord = built_server("communication/discord");

    let request = send(
        &discord,
        "channels:messages:add_my_message_reaction",
        json!({ "channel_id": "1", "message_id": "2", "emoji_name": "party:42" }),
        DISCORD,
    )
    .await;

    assert_eq!(
        request.url,
        "https://discord.com/api/v10/channels/1/messages/2/reactions/party%3A42/@me"
    );
}

#[tokio::test]
async fn reddit_lists_a_subreddits_hot_posts_with_the_bearer_token_and_a_descriptive_user_agent() {
    let reddit = built_server("communication/reddit");

    let request = send(
        &reddit,
        "posts:posts:list_subreddit_posts",
        json!({ "subreddit": "rust", "limit": 5 }),
        REDDIT,
    )
    .await;

    assert_eq!(endpoint(&request), "https://oauth.reddit.com/r/rust/hot");
    assert_eq!(query_value(&request, "limit").as_deref(), Some("5"));
    assert_eq!(query_value(&request, "raw_json").as_deref(), Some("1"));
    assert_eq!(header(&request, "Authorization"), Some("Bearer t"));
    assert!(
        header(&request, "User-Agent")
            .unwrap()
            .starts_with("usemcpkit:communication.reddit:")
    );
}

#[tokio::test]
async fn reddit_reads_a_posts_comment_tree_by_article_id() {
    let reddit = built_server("communication/reddit");

    let request = send(
        &reddit,
        "posts:comments:get_post_comments",
        json!({ "article": "1abcde", "sort": "top", "depth": 2 }),
        REDDIT,
    )
    .await;

    assert_eq!(endpoint(&request), "https://oauth.reddit.com/comments/1abcde");
    assert_eq!(query_value(&request, "sort").as_deref(), Some("top"));
    assert_eq!(query_value(&request, "depth").as_deref(), Some("2"));
}

#[tokio::test]
async fn confluence_creates_content_through_the_data_center_api_on_a_data_center_host() {
    let confluence = built_server("atlassian/confluence");
    let content = json!({
        "type": "page",
        "title": "Notes",
        "space": { "key": "DOCS" },
        "body": { "storage": { "value": "<p>Hi</p>", "representation": "storage" } },
        "ancestors": [{ "id": "7" }],
    });

    let request = send(
        &confluence,
        "datacenter:content:create",
        content.clone(),
        CONFLUENCE_DATA_CENTER,
    )
    .await;

    assert_eq!(request.method, HttpMethod::Post);
    assert_eq!(request.url, "https://wiki.acme.com/rest/api/content");
    assert_eq!(body(&request), content);
}

#[tokio::test]
async fn confluence_keeps_the_context_path_of_a_data_center_host() {
    let confluence = built_server("atlassian/confluence");

    let request = send(
        &confluence,
        "datacenter:content:get",
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
async fn confluence_creates_pages_through_the_v2_api_on_a_cloud_host() {
    let confluence = built_server("atlassian/confluence");
    let page = json!({
        "spaceId": "123",
        "parentId": "7",
        "status": "current",
        "title": "Notes",
        "body": { "representation": "storage", "value": "<p>Hi</p>" },
    });

    let request = send(&confluence, "cloud:pages:create_page", page.clone(), CONFLUENCE_CLOUD).await;

    assert_eq!(request.url, "https://acme.atlassian.net/wiki/api/v2/pages");
    assert_eq!(body(&request), page);
}

#[tokio::test]
async fn confluence_renames_hyphenated_v2_parameters_and_sends_them_under_the_original_keys() {
    let confluence = built_server("atlassian/confluence");

    let request = send(
        &confluence,
        "cloud:pages:get_page_by_id",
        json!({ "id": "7", "body_format": "storage", "get_draft": true }),
        CONFLUENCE_CLOUD,
    )
    .await;

    assert_eq!(
        request.url,
        "https://acme.atlassian.net/wiki/api/v2/pages/7?body-format=storage&get-draft=true"
    );
}

#[tokio::test]
async fn confluence_reaches_the_cloud_v1_api_under_wiki_rest_api() {
    let confluence = built_server("atlassian/confluence");

    let request = send(
        &confluence,
        "cloud_v1:search:search_by_cql",
        json!({ "cql": "type = page", "limit": 5 }),
        CONFLUENCE_CLOUD,
    )
    .await;

    assert_eq!(
        request.url,
        "https://acme.atlassian.net/wiki/rest/api/search?cql=type+%3D+page&limit=5"
    );
}
