//! The `extra` list of a `query` auth entry, which the recorded `0.9.0` golden predates.

use serde_json::{Value, json};
use usemcpkit_validation::validate_manifest;

fn manifest_with(auth: Value) -> Value {
    json!({
        "name": "trello",
        "category": "orgs/atlassian",
        "version": "1.0.0",
        "baseUrl": "https://api.trello.com/1",
        "auth": [auth],
        "tools": [{
            "name": "boards:get",
            "description": "Gets boards",
            "input": { "type": "object", "properties": {} },
            "request": { "method": "GET", "path": "/boards" },
        }],
    })
}

#[test]
fn accepts_a_query_entry_with_more_parameters() {
    let auth = json!({
        "type": "query",
        "env": "TRELLO_API_KEY",
        "name": "key",
        "extra": [{ "env": "TRELLO_TOKEN", "name": "token" }],
    });

    assert_eq!(validate_manifest(&manifest_with(auth)), Vec::<String>::new());
}

#[test]
fn reports_an_extra_list_that_is_not_a_list_of_env_and_name() {
    let not_a_list = json!({ "type": "query", "env": "K", "name": "key", "extra": "token" });
    let broken = json!({ "type": "query", "env": "K", "name": "key", "extra": [{ "env": "T" }, { "name": 1 }] });

    assert_eq!(
        validate_manifest(&manifest_with(not_a_list)),
        vec!["auth[0].extra must be an array".to_owned()]
    );
    assert_eq!(
        validate_manifest(&manifest_with(broken)),
        vec![
            "auth[0].extra[0].name must be a string".to_owned(),
            "auth[0].extra[1].env must be a string".to_owned(),
            "auth[0].extra[1].name must be a string".to_owned(),
        ]
    );
}
