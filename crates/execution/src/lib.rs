//! The Rust port of `@usemcpkit/core` `execution/` and `mapping/`: it builds the same requests and returns the same
//! results as the TypeScript executor.

pub mod args;
pub mod mapping;
pub mod request;
pub mod response;

mod json;
mod tool_error;

pub use tool_error::ToolError;
