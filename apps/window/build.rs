//! Tauri embeds the credentials page `apps/window/ui` builds as the app's frontend; this stops the build with the
//! command that makes it when it is missing. The window's three commands are the only ones the page may call.

use std::path::Path;
use tauri_build::{AppManifest, Attributes};

const WINDOW_COMMANDS: [&str; 3] = ["close_window", "fit_window", "open_link"];

fn main() {
    let manifest_dir = std::env::var("CARGO_MANIFEST_DIR").expect("cargo sets CARGO_MANIFEST_DIR");
    let page = Path::new(&manifest_dir).join("ui/build/usemcpkit.ui.html");
    println!("cargo:rerun-if-changed={}", page.display());
    assert!(
        page.is_file(),
        "{} is missing: build it first with `yarn workspace @usemcpkit/ui build`",
        page.display()
    );
    tauri_build::try_build(Attributes::new().app_manifest(AppManifest::new().commands(&WINDOW_COMMANDS)))
        .expect("the Tauri build step failed");
}
