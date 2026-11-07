use crate::mcp::code_mode::code_mode_host::CodeModeHost;
use crate::mcp::code_mode::create_envelope::create_envelope;
use rquickjs::prelude::Async;
use rquickjs::{Ctx, Function, Object};
use std::rc::Rc;
use usemcpkit_registry::Fetch;

/// The object the prelude receives: the host's functions, each answering with an envelope.
pub fn create_host_object<'js, F: Fetch + 'static>(
    ctx: &Ctx<'js>,
    host: &Rc<CodeModeHost<F>>,
) -> rquickjs::Result<Object<'js>> {
    let object = Object::new(ctx.clone())?;
    let servers_host = Rc::clone(host);
    object.set(
        "servers",
        Function::new(ctx.clone(), move || create_envelope(Ok(servers_host.servers())))?,
    )?;
    let groups_host = Rc::clone(host);
    object.set(
        "groups",
        Function::new(
            ctx.clone(),
            Async(move |server: String| {
                let host = Rc::clone(&groups_host);
                async move { create_envelope(host.groups(&server).await) }
            }),
        )?,
    )?;
    let tools_host = Rc::clone(host);
    object.set(
        "tools",
        Function::new(
            ctx.clone(),
            Async(move |server: Option<String>, group: Option<String>| {
                let host = Rc::clone(&tools_host);
                async move { create_envelope(host.tools(server.as_deref(), group.as_deref()).await) }
            }),
        )?,
    )?;
    let call_host = Rc::clone(host);
    object.set(
        "call",
        Function::new(
            ctx.clone(),
            Async(move |id: String, args: String| {
                let host = Rc::clone(&call_host);
                async move { create_envelope(host.call(&id, &args).await) }
            }),
        )?,
    )?;
    let log_host = Rc::clone(host);
    object.set(
        "log",
        Function::new(ctx.clone(), move |line: String| log_host.log(line))?,
    )?;
    Ok(object)
}
