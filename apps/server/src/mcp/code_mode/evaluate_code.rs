use crate::mcp::code_mode::code_mode_host::CodeModeHost;
use crate::mcp::code_mode::consts::PRELUDE;
use crate::mcp::code_mode::create_host_object::create_host_object;
use rquickjs::{CatchResultExt, Ctx, Function, Promise};
use std::rc::Rc;
use usemcpkit_registry::Fetch;

/// Sets up `codemode` and `console`, runs the wrapped code and waits for it: the JSON of what it returned, `None` when
/// that has no JSON, or the error it threw.
pub async fn evaluate_code<'js, F: Fetch + 'static>(
    ctx: Ctx<'js>,
    host: &Rc<CodeModeHost<F>>,
    script: String,
) -> Result<Option<String>, String> {
    let host_object = create_host_object(&ctx, host)
        .catch(&ctx)
        .map_err(|error| error.to_string())?;
    let prelude: Function = ctx.eval(PRELUDE).catch(&ctx).map_err(|error| error.to_string())?;
    prelude
        .call::<_, ()>((host_object,))
        .catch(&ctx)
        .map_err(|error| error.to_string())?;
    let promise: Promise = ctx.eval(script).catch(&ctx).map_err(|error| error.to_string())?;
    promise
        .into_future::<Option<String>>()
        .await
        .catch(&ctx)
        .map_err(|error| error.to_string())
}
