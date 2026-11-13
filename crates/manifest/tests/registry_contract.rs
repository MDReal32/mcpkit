use serde_json::Value;
use std::fs;
use std::path::{Path, PathBuf};
use usemcpkit_manifest::ManifestDocument;
use usemcpkit_manifest::registry::{PartFile, RegistryIndex};

fn registry_dir() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("../../packages/servers/build/manifests")
}

fn read_json(path: &Path) -> (String, Value) {
    let text = fs::read_to_string(path).unwrap_or_else(|error| panic!("{}: {error}", path.display()));
    let value = serde_json::from_str(&text).unwrap_or_else(|error| panic!("{}: {error}", path.display()));
    (text, value)
}

fn json_files(dir: &Path, found: &mut Vec<PathBuf>) {
    for entry in fs::read_dir(dir).unwrap_or_else(|error| panic!("{}: {error}", dir.display())) {
        let path = entry.expect("registry entry").path();
        if path.is_dir() {
            json_files(&path, found);
        } else if path.extension().is_some_and(|extension| extension == "json") {
            found.push(path);
        }
    }
}

fn written_manifest(document: &ManifestDocument, original: &Value) -> Value {
    let mut written = serde_json::to_value(&document.manifest).expect("manifest serializes");
    let object = written.as_object_mut().expect("manifest is an object");
    if !original.as_object().is_some_and(|source| source.contains_key("tools")) {
        object.remove("tools");
    }
    if let Some(parts) = &document.parts {
        object.insert("parts".into(), serde_json::to_value(parts).expect("parts serialize"));
    }
    written
}

#[test]
fn reads_and_writes_every_registry_file_unchanged() {
    let dir = registry_dir();
    assert!(
        dir.join("index.json").is_file(),
        "{} has no index.json: run `yarn workspace @usemcpkit/servers build` first",
        dir.display()
    );

    let mut files = Vec::new();
    json_files(&dir, &mut files);
    let (mut manifests, mut shells, mut parts, mut documents) = (0, 0, 0, 0);

    for path in files {
        let (text, original) = read_json(&path);
        let relative = path.strip_prefix(&dir).expect("inside the registry");
        let is_openapi_document = ["openapi", "swagger"].iter().any(|key| original.get(key).is_some());
        if relative.components().count() == 3 && is_openapi_document {
            documents += 1;
            continue;
        }
        let written = if relative == Path::new("index.json") {
            let index: RegistryIndex = serde_json::from_str(&text).unwrap_or_else(|error| panic!("index: {error}"));
            assert!(!index.servers.is_empty(), "the index lists no servers");
            serde_json::to_value(&index).expect("index serializes")
        } else if relative.components().count() == 3 {
            let part: PartFile =
                serde_json::from_str(&text).unwrap_or_else(|error| panic!("{}: {error}", relative.display()));
            parts += 1;
            serde_json::to_value(&part).expect("part serializes")
        } else {
            let document =
                ManifestDocument::from_json(&text).unwrap_or_else(|error| panic!("{}: {error}", relative.display()));
            if document.is_shell() {
                shells += 1;
            } else {
                manifests += 1;
            }
            written_manifest(&document, &original)
        };
        assert_eq!(written, original, "{} changed on a round trip", relative.display());
    }

    assert!(manifests > 0, "no whole manifests found");
    assert_eq!(shells, parts, "a shell without parts or a part without a shell");
    assert!(documents > 0, "no published OpenAPI documents found");
}
