//! The server embeds the credentials page `apps/window/ui` builds (for the browser fallback) and the credentials window
//! program `apps/window` builds; this stops the build with the command that makes either when it is missing, instead
//! of an `include_str!` error about a path.

use std::path::{Path, PathBuf};

const WINDOW_PROGRAM: &str = if cfg!(windows) {
    "usemcpkit-window.exe"
} else {
    "usemcpkit-window"
};

fn main() {
    let manifest_dir = std::env::var("CARGO_MANIFEST_DIR").expect("cargo sets CARGO_MANIFEST_DIR");
    let manifest_dir = Path::new(&manifest_dir);
    let page = manifest_dir.join("../window/ui/build/usemcpkit.ui.html");
    println!("cargo:rerun-if-changed={}", page.display());
    assert!(
        page.is_file(),
        "{} is missing: build it first with `yarn workspace @usemcpkit/ui build`",
        page.display()
    );
    println!("cargo:rerun-if-env-changed=USEMCPKIT_WINDOW_BINARY");
    let program = find_window_program(manifest_dir);
    println!("cargo:rerun-if-changed={}", program.display());
    println!("cargo:rustc-env=USEMCPKIT_WINDOW_BINARY={}", program.display());
}

/// `USEMCPKIT_WINDOW_BINARY`, else the program of the profile being built, else the release one.
fn find_window_program(manifest_dir: &Path) -> PathBuf {
    if let Some(path) = std::env::var_os("USEMCPKIT_WINDOW_BINARY") {
        return PathBuf::from(path);
    }
    let profile = std::env::var("PROFILE").expect("cargo sets PROFILE");
    let target = manifest_dir.join("../../target");
    let candidates = [profile.as_str(), "release"].map(|folder| target.join(folder).join(WINDOW_PROGRAM));
    let found = candidates.iter().find(|candidate| candidate.is_file());
    match found {
        Some(program) => program.canonicalize().expect("the window program can be resolved"),
        None => panic!(
            "{} is missing: build it first with `cargo build -p usemcpkit-window{}`",
            candidates[0].display(),
            if profile == "release" { " --release" } else { "" }
        ),
    }
}
