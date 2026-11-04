use mcpkit_binary::BinaryContext;
use mcpkit_core::env::Env;
use mcpkit_http::ReqwestClient;
use std::rc::Rc;

/// This process's target, variables, mcpkit home and executable, with a client for the npm registry.
pub fn create_binary_context() -> Result<BinaryContext, String> {
    let http = ReqwestClient::new().map_err(|error| error.0)?;
    BinaryContext::current(Env::from_process(), Rc::new(http)).map_err(|error| error.0)
}
