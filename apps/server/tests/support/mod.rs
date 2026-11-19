#![allow(
    dead_code,
    unused_imports,
    reason = "each test binary uses only some of the fixtures"
)]

mod call_context;
mod folder_fetcher;
mod registry_root;
mod result_text;
mod run_code;

pub use call_context::call_context;
pub use folder_fetcher::FolderFetcher;
pub use registry_root::registry_root;
pub use result_text::{result_text, result_values};
pub use run_code::run_code;
