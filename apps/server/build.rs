//! The server embeds the credentials page `packages/ui` builds; this stops the build with the command that makes it
//! when it is missing, instead of an `include_str!` error about a path.

use std::path::Path;

fn main() {
    let manifest_dir = std::env::var("CARGO_MANIFEST_DIR").expect("cargo sets CARGO_MANIFEST_DIR");
    let page = Path::new(&manifest_dir).join("../../packages/ui/build/mcpkit.ui.html");
    println!("cargo:rerun-if-changed={}", page.display());
    assert!(
        page.is_file(),
        "{} is missing: build it first with `yarn workspace @usemcpkit/ui build`",
        page.display()
    );
}
