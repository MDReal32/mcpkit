//! The credentials form contract against `fixtures/credentials-form.golden.json`, written by core's
//! `test/credential-golden.generate.test.ts` from the TypeScript implementation; regenerate it when the registry changes.

use mcpkit_auth::credentials::{CredentialRequest, build_credential_request, validate_credential_response};
use mcpkit_core::env::Env;
use mcpkit_manifest::Manifest;
use serde::Deserialize;
use serde_json::Value;
use std::collections::BTreeMap;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Golden {
    requests: Vec<RequestCase>,
    validations: Vec<ValidationCase>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct RequestCase {
    label: String,
    manifest: Manifest,
    domain: Option<String>,
    known_hosts: Vec<String>,
    env: BTreeMap<String, String>,
    request: Value,
}

#[derive(Deserialize)]
struct ValidationCase {
    label: String,
    request: CredentialRequest,
    response: Value,
    errors: Vec<String>,
}

fn golden() -> Golden {
    serde_json::from_str(include_str!("fixtures/credentials-form.golden.json")).unwrap()
}

#[test]
fn builds_the_same_request_as_typescript_for_every_registry_server() {
    let cases = golden().requests;
    assert!(cases.len() > 10, "the golden file lists too few requests");
    for case in cases {
        let request = build_credential_request(
            &case.manifest,
            case.domain.as_deref(),
            case.known_hosts,
            &Env::from_pairs(case.env),
        );
        assert_eq!(serde_json::to_value(&request).unwrap(), case.request, "{}", case.label);
    }
}

#[test]
fn rejects_the_same_answers_with_the_same_errors_as_typescript() {
    let cases = golden().validations;
    assert!(cases.len() > 30, "the golden file lists too few validations");
    for case in cases {
        let errors = validate_credential_response(&case.request, &case.response);
        assert_eq!(errors, case.errors, "{}", case.label);
    }
}
