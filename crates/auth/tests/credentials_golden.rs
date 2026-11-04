//! The credentials form contract against `fixtures/credentials-form.golden.json`, written by core's
//! `test/credential-golden.generate.test.ts` from the TypeScript implementation; regenerate it when the registry changes.

use serde::Deserialize;
use serde_json::Value;
use std::collections::BTreeMap;
use usemcpkit_auth::credentials::{
    CREDENTIALS_FORM_CANCEL_PATH, CREDENTIALS_FORM_IMPORT_PATH, CREDENTIALS_FORM_SESSION_HEADER,
    CREDENTIALS_FORM_SUBMIT_PATH, CREDENTIALS_REQUEST_ELEMENT_ID, CredentialRequest, build_credential_request,
    validate_credential_response,
};
use usemcpkit_core::env::Env;
use usemcpkit_manifest::Manifest;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Golden {
    constants: Value,
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
fn shares_the_page_contract_constants_with_typescript() {
    assert_eq!(
        golden().constants,
        serde_json::json!({
            "api": {
                "submit": CREDENTIALS_FORM_SUBMIT_PATH,
                "cancel": CREDENTIALS_FORM_CANCEL_PATH,
                "import": CREDENTIALS_FORM_IMPORT_PATH,
            },
            "sessionHeader": CREDENTIALS_FORM_SESSION_HEADER,
            "requestElementId": CREDENTIALS_REQUEST_ELEMENT_ID,
        })
    );
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
