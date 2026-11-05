//! The Rust port of `@usemcpkit/core` `execution/` and `mapping/`: it builds the same requests and returns the same
//! results as the TypeScript executor.

pub mod args;
pub mod auth_fallback;
pub mod mapping;
pub mod request;
pub mod response;
pub mod upstream;

mod call_context;
mod consts;
mod execute_tool;
mod executor_state;
mod json;
mod tool_error;

pub use call_context::CallContext;
pub use consts::DEFAULT_TIMEOUT;
pub use execute_tool::execute_tool;
pub use executor_state::ExecutorState;
pub use tool_error::ToolError;
