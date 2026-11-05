//! `validate_manifest` against `fixtures/validation.golden.json`, recorded from the TypeScript `validateManifest` of
//! `0.9.0` with each case's manifest inside it; a new case is added to the file by hand. A broken regular expression
//! is reported with the `regex` crate's text instead of JavaScript's, so only the start of that error is compared.

use serde::Deserialize;
use serde_json::Value;
use usemcpkit_validation::{is_valid_manifest, validate_manifest};

const REGEX_ERROR: &str = "is not a valid regular expression: ";

#[derive(Deserialize)]
struct Golden {
    cases: Vec<Case>,
}

#[derive(Deserialize)]
struct Case {
    manifest: Value,
    errors: Vec<String>,
}

fn golden() -> Golden {
    serde_json::from_str(include_str!("fixtures/validation.golden.json")).unwrap()
}

fn comparable(error: &str) -> &str {
    error
        .find(REGEX_ERROR)
        .map_or(error, |start| &error[..start + REGEX_ERROR.len()])
}

#[test]
fn reports_the_recorded_errors_for_every_case() {
    let cases = golden().cases;
    assert!(cases.len() > 100, "the golden file lists too few cases");
    for case in cases {
        let errors = validate_manifest(&case.manifest);
        let actual: Vec<&str> = errors.iter().map(|error| comparable(error)).collect();
        let expected: Vec<&str> = case.errors.iter().map(|error| comparable(error)).collect();
        assert_eq!(actual, expected, "{}", case.manifest);
        assert_eq!(is_valid_manifest(&case.manifest), case.errors.is_empty());
    }
}

#[test]
fn reports_a_broken_naming_pattern_with_the_regex_error() {
    let manifest = serde_json::json!({
        "name": "demo",
        "category": "test",
        "version": "1.0.0",
        "baseUrl": "https://api.example.com/",
        "tools": [],
        "upstream": { "type": "stdio", "command": "uv", "naming": [{ "match": "(", "name": "a:b:c" }] },
    });
    let errors = validate_manifest(&manifest);
    assert_eq!(errors.len(), 1);
    assert!(errors[0].starts_with("upstream.naming[0].match is not a valid regular expression: regex parse error"));
}
