//! Builds the tools of an OpenAPI manifest on the user's machine: reads the OpenAPI 3 or Swagger 2.0 document of the
//! version the user's server runs, turns each endpoint into a tool named after it.

pub mod document;
pub mod merge;
pub mod version;

mod body;
mod build_tools;
mod built_tools;
mod consts;
mod endpoints;
mod naming;
mod open_api_error;
mod schema;
mod tool;

pub use build_tools::build_tools;
pub use built_tools::BuiltTools;
pub use open_api_error::OpenApiError;
