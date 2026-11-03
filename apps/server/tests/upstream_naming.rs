mod support;

use mcpkit_manifest::upstream::UpstreamNameRule;
use mcpkit_server::upstream::to_catalog_tool_names;
use regex::Regex;
use serde_json::Value;
use std::path::Path;
use support::registry_root;

/// Written by the TypeScript `toCatalogToolNames` over the built manifests' naming rules; regenerate it when a rule
/// changes.
fn golden() -> Value {
    let text =
        std::fs::read_to_string(Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/fixtures/upstream-naming.json"))
            .unwrap();
    serde_json::from_str(&text).unwrap()
}

fn strings(value: &Value) -> Vec<String> {
    value
        .as_array()
        .unwrap()
        .iter()
        .map(|name| name.as_str().unwrap().to_owned())
        .collect()
}

fn read_naming(manifest: &Value) -> Option<Vec<UpstreamNameRule>> {
    let naming = manifest.get("upstream")?.get("naming")?;
    Some(serde_json::from_value(naming.clone()).unwrap())
}

fn read_manifest(path: &Path) -> Value {
    serde_json::from_str(&std::fs::read_to_string(path).unwrap()).unwrap()
}

#[test]
fn names_upstream_tools_like_the_typescript_cli() {
    let golden = golden();
    for (path, case) in golden["toolNames"].as_object().unwrap() {
        let manifest = read_manifest(&registry_root().join(format!("{path}.json")));
        let naming = read_naming(&manifest);
        let names = strings(&case["names"]);
        let upstream_names: Vec<&str> = names.iter().map(String::as_str).collect();

        let catalog = to_catalog_tool_names(&upstream_names, naming.as_deref()).unwrap();

        assert_eq!(catalog, strings(&case["catalog"]), "{path}");
    }
}

#[test]
fn names_tools_no_rule_matches_and_numbers_clashes_like_the_typescript_cli() {
    let golden = golden();
    let names = strings(&golden["plain"]["names"]);
    let upstream_names: Vec<&str> = names.iter().map(String::as_str).collect();

    let catalog = to_catalog_tool_names(&upstream_names, None).unwrap();

    assert_eq!(catalog, strings(&golden["plain"]["catalog"]));
}

#[test]
fn compiles_every_naming_rule_of_the_built_registry() {
    let mut checked = 0;
    let mut pending = vec![registry_root()];
    while let Some(dir) = pending.pop() {
        for entry in std::fs::read_dir(&dir).unwrap() {
            let path = entry.unwrap().path();
            if path.is_dir() {
                pending.push(path);
                continue;
            }
            if path.extension().is_none_or(|extension| extension != "json") {
                continue;
            }
            for rule in read_naming(&read_manifest(&path)).into_iter().flatten() {
                assert!(
                    Regex::new(&rule.pattern).is_ok(),
                    "{}: \"{}\" is not a regular expression the Rust server reads",
                    path.display(),
                    rule.pattern
                );
                checked += 1;
            }
        }
    }
    assert!(
        checked > 0,
        "no naming rule was found under {}",
        registry_root().display()
    );
}

#[test]
fn fails_on_a_rule_that_does_not_give_a_catalog_name() {
    let rules = vec![UpstreamNameRule {
        pattern: "^(.+)$".to_owned(),
        name: "tools:$1".to_owned(),
    }];

    let failed = to_catalog_tool_names(&["list"], Some(&rules));

    assert_eq!(
        failed,
        Err(
            "naming rule \"^(.+)$\" turned \"list\" into \"tools:list\", which is not <group>:<resource>:<action>"
                .to_owned()
        )
    );
}
