#![allow(
    dead_code,
    unused_imports,
    reason = "each test binary uses only some of the fixtures"
)]

mod call_context;
mod registry_root;

pub use call_context::call_context;
pub use registry_root::registry_root;
