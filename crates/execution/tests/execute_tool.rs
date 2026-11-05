use serde_json::{Map, Value, json};
use std::cell::RefCell;
use std::path::Path;
use std::rc::Rc;
use usemcpkit_auth::{AuthContext, AuthState};
use usemcpkit_core::env::Env;
use usemcpkit_execution::{CallContext, DEFAULT_TIMEOUT, ExecutorState, execute_tool};
use usemcpkit_http::{HttpClient, HttpResponse};
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::tool::ToolSpec;
use usemcpkit_testing::{
    DEMO_TOKEN_URL, FixedClient, PING_URL, RecordingClient, TokenCheckingClient, approve_sign_in, demo_manifest,
    demo_oauth, json_response, ping_manifest,
};

fn call_context(home: &Path, env: &[(&str, &str)], http: Rc<dyn HttpClient>) -> CallContext {
    CallContext {
        auth: AuthContext {
            env: Env::from_pairs(env.iter().copied()),
            home: home.to_path_buf(),
            http,
            on_authorization_url: None,
            project_dir: None,
            request_credentials: None,
            secret_store: None,
            state: Rc::new(AuthState::default()),
        },
        timeout: DEFAULT_TIMEOUT,
        state: Rc::new(ExecutorState::default()),
    }
}

fn args(value: Value) -> Map<String, Value> {
    value.as_object().expect("arguments are an object").clone()
}

fn tool<'a>(manifest: &'a Manifest, name: &str) -> &'a ToolSpec {
    manifest
        .tools
        .iter()
        .find(|tool| tool.name == name)
        .expect("the tool exists")
}

fn auth_list() -> Value {
    json!([demo_oauth(), { "type": "bearer", "env": "FIRST_TOKEN" }, { "type": "bearer", "env": "SECOND_TOKEN" }])
}

fn write_tokens(home: &Path, tokens: Value) {
    std::fs::write(home.join("tokens.json"), tokens.to_string()).unwrap();
}

fn read_tokens(home: &Path) -> Value {
    serde_json::from_str(&std::fs::read_to_string(home.join("tokens.json")).unwrap()).unwrap()
}

async fn call_ping(manifest: &Manifest, context: &CallContext) -> Result<Option<Value>, String> {
    execute_tool(manifest, &manifest.tools[0], Some(&Map::new()), context)
        .await
        .map_err(|error| error.0)
}

#[tokio::test]
async fn maps_a_successful_response() {
    let home = tempfile::tempdir().unwrap();
    let http = Rc::new(FixedClient::new(json_response(200, &json!({ "data": [{ "id": 7 }] }))));
    let manifest = demo_manifest();
    let context = call_context(home.path(), &[("TOKEN", "secret")], http.clone());

    let result = execute_tool(
        &manifest,
        tool(&manifest, "list_items"),
        Some(&args(json!({ "owner": "o" }))),
        &context,
    )
    .await
    .unwrap();

    assert_eq!(result, Some(json!([{ "id": 7, "author": null }])));
    assert_eq!(
        http.requests.borrow()[0].url,
        "https://api.example.com/owners/o/items?s=open"
    );
}

#[tokio::test]
async fn turns_api_errors_into_a_tool_error_with_the_api_message() {
    let home = tempfile::tempdir().unwrap();
    let http = Rc::new(FixedClient::new(json_response(404, &json!({ "message": "Not Found" }))));
    let manifest = demo_manifest();
    let context = call_context(home.path(), &[], http);

    let error = execute_tool(
        &manifest,
        tool(&manifest, "list_items"),
        Some(&args(json!({ "owner": "o" }))),
        &context,
    )
    .await
    .unwrap_err();

    assert_eq!(error.0, "demo API 404: Not Found");
}

#[tokio::test]
async fn saves_a_download_to_the_local_path_instead_of_returning_it() {
    let home = tempfile::tempdir().unwrap();
    let path = home.path().join("nested").join("out.bin");
    let download: ToolSpec = serde_json::from_value(json!({
        "name": "download_archive",
        "description": "List items",
        "input": { "type": "object", "properties": { "owner": { "type": "string" }, "save_to": { "type": "string" } } },
        "request": { "method": "GET", "path": "/owners/{owner}/archive", "saveToArg": "save_to" },
    }))
    .unwrap();
    let response = HttpResponse {
        status: 200,
        content_type: None,
        headers: Vec::new(),
        body: vec![1, 2, 3],
    };
    let context = call_context(home.path(), &[], Rc::new(FixedClient::new(response)));
    let call_args = args(json!({ "owner": "o", "save_to": path }));

    let result = execute_tool(&demo_manifest(), &download, Some(&call_args), &context)
        .await
        .unwrap();

    assert_eq!(
        result,
        Some(json!({ "savedTo": path, "bytes": 3, "contentType": null }))
    );
    assert_eq!(std::fs::read(&path).unwrap(), vec![1, 2, 3]);
}

#[tokio::test]
async fn returns_non_json_bodies_as_text() {
    let home = tempfile::tempdir().unwrap();
    let response = HttpResponse {
        status: 200,
        content_type: Some("text/plain;charset=UTF-8".into()),
        headers: Vec::new(),
        body: b"plain".to_vec(),
    };
    let manifest = demo_manifest();
    let context = call_context(home.path(), &[], Rc::new(FixedClient::new(response)));
    let call_args = args(json!({ "owner": "o", "title": "t" }));

    let result = execute_tool(&manifest, tool(&manifest, "create_item"), Some(&call_args), &context)
        .await
        .unwrap();

    assert_eq!(result, Some(json!("plain")));
}

#[tokio::test]
async fn uses_the_tokens_json_token_first() {
    let home = tempfile::tempdir().unwrap();
    let expires_at = usemcpkit_auth::oauth::now_epoch_ms() + 3_600_000.0;
    write_tokens(
        home.path(),
        json!({ "stored_first": { "accessToken": "stored", "tokenType": "bearer", "expiresAt": expires_at } }),
    );
    let http = Rc::new(TokenCheckingClient::new("stored", []));
    let manifest = ping_manifest("stored_first", Some(auth_list()));
    let context = call_context(home.path(), &[("FIRST_TOKEN", "first")], http.clone());

    assert_eq!(call_ping(&manifest, &context).await, Ok(Some(json!({ "pong": true }))));
    assert_eq!(*http.sent_authorizations.borrow(), ["Bearer stored"]);
}

#[tokio::test]
async fn uses_a_provided_fallback_moves_past_a_401_and_remembers_the_winner() {
    let home = tempfile::tempdir().unwrap();
    let http = Rc::new(TokenCheckingClient::new("second", []));
    let manifest = ping_manifest("falls_back", Some(auth_list()));
    let env = [("FIRST_TOKEN", "revoked"), ("SECOND_TOKEN", "second")];
    let context = call_context(home.path(), &env, http.clone());

    assert_eq!(call_ping(&manifest, &context).await, Ok(Some(json!({ "pong": true }))));
    assert_eq!(*http.sent_authorizations.borrow(), ["Bearer revoked", "Bearer second"]);

    assert_eq!(call_ping(&manifest, &context).await, Ok(Some(json!({ "pong": true }))));
    assert_eq!(
        *http.sent_authorizations.borrow(),
        ["Bearer revoked", "Bearer second", "Bearer second"]
    );
}

#[tokio::test]
async fn signs_in_with_oauth2_when_no_fallback_is_provided_and_keeps_the_token_for_the_next_call() {
    let home = tempfile::tempdir().unwrap();
    let http = Rc::new(TokenCheckingClient::new(
        "signed-in",
        [(
            DEMO_TOKEN_URL.to_owned(),
            json!({ "access_token": "signed-in", "token_type": "bearer", "expires_in": 3600 }),
        )],
    ));
    let manifest = ping_manifest("signs_in", Some(auth_list()));
    let mut context = call_context(home.path(), &[], http.clone());
    let authorization_urls = Rc::new(RefCell::new(Vec::new()));
    let shown_urls = Rc::clone(&authorization_urls);
    context.auth.on_authorization_url = Some(Rc::new(move |url: &str| {
        shown_urls
            .borrow_mut()
            .push((url.to_owned(), approve_sign_in(url, None)));
    }));

    assert_eq!(call_ping(&manifest, &context).await, Ok(Some(json!({ "pong": true }))));
    assert_eq!(call_ping(&manifest, &context).await, Ok(Some(json!({ "pong": true }))));

    let shown: Vec<_> = authorization_urls.borrow_mut().drain(..).collect();
    assert_eq!(shown.len(), 1);
    for (_, callback) in shown {
        assert_eq!(callback.join().unwrap(), "HTTP/1.1 200 OK");
    }
    assert_eq!(
        *http.sent_authorizations.borrow(),
        ["Bearer signed-in", "Bearer signed-in"]
    );
    let saved = &read_tokens(home.path())["signs_in"];
    assert_eq!(saved["accessToken"], "signed-in");
    assert_eq!(saved["authKey"], format!("oauth {DEMO_TOKEN_URL}"));
}

#[tokio::test]
async fn lists_every_option_when_none_works() {
    let home = tempfile::tempdir().unwrap();
    let http = Rc::new(TokenCheckingClient::new("unknown", []));
    let manifest = ping_manifest("none_works", Some(auth_list()));
    let context = call_context(home.path(), &[("FIRST_TOKEN", "revoked")], http);

    let error = call_ping(&manifest, &context).await.unwrap_err();

    assert_eq!(
        error,
        [
            "none_works: no auth option worked",
            "  tokens.json: none_works: not signed in yet",
            "  auth[1] bearer FIRST_TOKEN: API answered 401: Bad credentials",
            "  auth[2] bearer SECOND_TOKEN: none_works: missing credential, set the SECOND_TOKEN environment variable or enter it in the credentials form",
            "  auth[0] oauth pkce sign-in: none_works: sign-in needs a browser, which this caller does not provide",
        ]
        .join("\n")
    );
}

#[tokio::test]
async fn refreshes_an_expired_token_once_keeps_the_refresh_token_and_calls_with_the_new_token() {
    let home = tempfile::tempdir().unwrap();
    write_tokens(
        home.path(),
        json!({ "demo": { "accessToken": "old", "tokenType": "bearer", "refreshToken": "rt-1", "expiresAt": 0 } }),
    );
    let http = Rc::new(RecordingClient::new([
        (
            DEMO_TOKEN_URL.to_owned(),
            json!({ "access_token": "new", "token_type": "bearer", "expires_in": 3600 }),
        ),
        (PING_URL.to_owned(), json!({ "pong": true })),
    ]));
    let manifest = ping_manifest("demo", Some(json!([demo_oauth()])));
    let context = call_context(home.path(), &[], http.clone());

    let results = tokio::join!(call_ping(&manifest, &context), call_ping(&manifest, &context));

    let pong = Ok(Some(json!({ "pong": true })));
    assert_eq!(results, (pong.clone(), pong));
    let requests = http.requests.borrow();
    let token_requests: Vec<_> = requests
        .iter()
        .filter(|request| request.url == DEMO_TOKEN_URL)
        .collect();
    assert_eq!(token_requests.len(), 1);
    let ping_authorizations: Vec<_> = requests
        .iter()
        .filter(|request| request.url == PING_URL)
        .map(|request| request.headers["Authorization"].as_str())
        .collect();
    assert_eq!(ping_authorizations, ["Bearer new", "Bearer new"]);
    let saved = &read_tokens(home.path())["demo"];
    assert_eq!(
        (&saved["accessToken"], &saved["refreshToken"]),
        (&json!("new"), &json!("rt-1"))
    );
}

#[tokio::test]
async fn surfaces_provider_errors_reported_with_http_200() {
    let home = tempfile::tempdir().unwrap();
    write_tokens(
        home.path(),
        json!({ "demo": { "accessToken": "old", "tokenType": "bearer", "refreshToken": "rt-1", "expiresAt": 0 } }),
    );
    let http = Rc::new(RecordingClient::new([(
        DEMO_TOKEN_URL.to_owned(),
        json!({ "error": "bad_refresh_token", "error_description": "The refresh token is invalid" }),
    )]));
    let manifest = ping_manifest("demo", Some(json!([demo_oauth()])));
    let context = call_context(home.path(), &[], http.clone());

    let error = call_ping(&manifest, &context).await.unwrap_err();

    assert!(
        error.contains("demo: token request failed: The refresh token is invalid"),
        "{error}"
    );
    let token_request = &http.requests.borrow()[0];
    assert_eq!(
        token_request.body,
        Some(usemcpkit_http::RequestBody::Text(
            "grant_type=refresh_token&refresh_token=rt-1&client_id=client-1".into()
        ))
    );
}

#[tokio::test]
async fn refuses_a_malformed_tokens_file_instead_of_overwriting_it() {
    let home = tempfile::tempdir().unwrap();
    write_tokens(home.path(), json!({ "demo": { "accessToken": 1 } }));
    let manifest = ping_manifest("demo", Some(json!([demo_oauth()])));
    let context = call_context(home.path(), &[], Rc::new(RecordingClient::new([])));

    let error = call_ping(&manifest, &context).await.unwrap_err();

    assert!(error.contains("is not a valid tokens file"), "{error}");
    assert_eq!(read_tokens(home.path()), json!({ "demo": { "accessToken": 1 } }));
}

fn edition_manifest() -> Manifest {
    serde_json::from_value(json!({
        "name": "tracker",
        "category": "test",
        "version": "1.0.0",
        "description": "",
        "baseUrl": "https://{domain}",
        "domain": { "env": "TRACKER_HOST" },
        "editions": { "cloud": { "label": "Cloud", "hosts": [".atlassian.net"] } },
        "auth": [{ "type": "bearer", "env": "TOKEN", "label": "Personal access token" }],
        "tools": [{
            "name": "search",
            "description": "Search",
            "input": { "type": "object", "properties": { "jql": { "type": "string" } }, "required": ["jql"] },
            "request": { "method": "GET", "path": "/rest/api/2/search", "query": ["jql"], "fixedQuery": { "fields": "summary" } },
            "response": { "root": "issues", "fields": { "key": "key" } },
            "editions": {
                "cloud": {
                    "request": { "method": "GET", "path": "/rest/api/2/search/jql", "query": ["jql"], "fixedQuery": { "fields": "summary" } },
                },
            },
        }],
    }))
    .unwrap()
}

#[tokio::test]
async fn sends_each_host_the_request_of_its_edition_and_maps_the_response() {
    let cases = [
        (
            "acme.atlassian.net",
            "https://acme.atlassian.net/rest/api/2/search/jql?fields=summary&jql=x",
        ),
        (
            "jira.example.com/jira",
            "https://jira.example.com/jira/rest/api/2/search?fields=summary&jql=x",
        ),
    ];
    for (host, url) in cases {
        let home = tempfile::tempdir().unwrap();
        let http = Rc::new(RecordingClient::new([(
            url.to_owned(),
            json!({ "issues": [{ "key": "A-1", "id": "1" }] }),
        )]));
        let manifest = edition_manifest();
        let context = call_context(home.path(), &[("TRACKER_HOST", host), ("TOKEN", "t")], http.clone());

        let result = execute_tool(
            &manifest,
            &manifest.tools[0],
            Some(&args(json!({ "jql": "x" }))),
            &context,
        )
        .await
        .unwrap();

        assert_eq!(http.urls(), [url]);
        assert_eq!(result, Some(json!([{ "key": "A-1" }])));
    }
}

#[tokio::test]
async fn says_the_domain_is_missing_when_a_server_needs_one() {
    let home = tempfile::tempdir().unwrap();
    let manifest = edition_manifest();
    let context = call_context(home.path(), &[("TOKEN", "t")], Rc::new(RecordingClient::new([])));

    let error = execute_tool(
        &manifest,
        &manifest.tools[0],
        Some(&args(json!({ "jql": "x" }))),
        &context,
    )
    .await
    .unwrap_err();

    assert_eq!(
        error.0,
        "tracker: no auth option worked\n  domain: no domain is set, set the TRACKER_HOST environment variable"
    );
}
