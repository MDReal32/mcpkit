use std::rc::Rc;
use usemcpkit_binary::{BinaryContext, BinaryLayout};
use usemcpkit_core::env::Env;
use usemcpkit_http::ReqwestClient;

/// This process's target, variables, usemcpkit home and executable, with a client for the npm registry, laid out as
/// `layout`.
pub fn create_binary_context(layout: BinaryLayout) -> Result<BinaryContext, String> {
    let http = ReqwestClient::new().map_err(|error| error.0)?;
    let mut context = BinaryContext::current(Env::from_process(), Rc::new(http)).map_err(|error| error.0)?;
    context.layout = layout;
    Ok(context)
}
