use std::rc::Rc;
use usemcpkit_binary::BinaryContext;
use usemcpkit_core::env::Env;
use usemcpkit_http::ReqwestClient;

/// This process's target, variables, usemcpkit home and executable, with a client for the npm registry.
pub fn create_binary_context() -> Result<BinaryContext, String> {
    let http = ReqwestClient::new().map_err(|error| error.0)?;
    BinaryContext::current(Env::from_process(), Rc::new(http)).map_err(|error| error.0)
}
