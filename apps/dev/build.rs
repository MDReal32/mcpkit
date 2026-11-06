//! Compiles the registry `packages/servers` builds into the dev binary, as each file of `build/manifests` by its path
//! inside that folder; stops with the command that builds it when it is missing.

use std::fmt::Write as _;
use std::path::{Path, PathBuf};

fn main() {
    let manifest_dir = std::env::var("CARGO_MANIFEST_DIR").expect("cargo sets CARGO_MANIFEST_DIR");
    let registry = Path::new(&manifest_dir)
        .join("../../packages/servers/build/manifests")
        .canonicalize()
        .expect("packages/servers/build/manifests is missing: build it first with `yarn workspace @usemcpkit/servers build`");
    println!("cargo:rerun-if-changed={}", registry.display());
    assert!(
        registry.join("index.json").is_file(),
        "{} has no index.json: build it first with `yarn workspace @usemcpkit/servers build`",
        registry.display()
    );
    let mut files = Vec::new();
    let mut pending = vec![registry.clone()];
    while let Some(dir) = pending.pop() {
        for entry in std::fs::read_dir(&dir).expect("a readable registry folder") {
            let path = entry.expect("a readable registry entry").path();
            if path.is_dir() {
                pending.push(path);
            } else {
                files.push(path);
            }
        }
    }
    files.sort();
    let mut source = String::from("&[\n");
    for file in &files {
        let link = file
            .strip_prefix(&registry)
            .expect("a file inside the registry folder")
            .components()
            .map(|component| component.as_os_str().to_str().expect("a UTF-8 registry path"))
            .collect::<Vec<_>>()
            .join("/");
        writeln!(
            source,
            "    ({link:?}, include_str!({:?})),",
            file.display().to_string()
        )
        .expect("writing to a String");
    }
    source.push(']');
    let out_dir = PathBuf::from(std::env::var("OUT_DIR").expect("cargo sets OUT_DIR"));
    std::fs::write(out_dir.join("registry_files.rs"), source).expect("a writable OUT_DIR");
}
