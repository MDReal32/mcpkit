use crate::mcp::code_mode::code_mode_host::CodeModeHost;
use crate::mcp::code_mode::consts::{MAX_STACK_SIZE, MEMORY_LIMIT, RUN_TIMEOUT};
use crate::mcp::code_mode::evaluate_code::evaluate_code;
use crate::mcp::code_mode::wrap_code::wrap_code;
use rquickjs::{AsyncContext, AsyncRuntime};
use std::rc::Rc;
use std::time::Instant;
use usemcpkit_registry::Fetch;

/// Runs the code in a fresh QuickJS runtime of its own. JavaScript still running at the deadline is interrupted, and a
/// run still waiting on tool calls then is dropped.
pub async fn run_in_sandbox<F: Fetch + 'static>(
    host: &Rc<CodeModeHost<F>>,
    code: &str,
) -> Result<Option<String>, String> {
    let runtime = AsyncRuntime::new().map_err(|error| format!("cannot start the JavaScript runtime: {error}"))?;
    runtime.set_memory_limit(MEMORY_LIMIT).await;
    runtime.set_max_stack_size(MAX_STACK_SIZE).await;
    let deadline = Instant::now() + RUN_TIMEOUT;
    runtime
        .set_interrupt_handler(Some(Box::new(move || Instant::now() >= deadline)))
        .await;
    let context = AsyncContext::full(&runtime)
        .await
        .map_err(|error| format!("cannot start the JavaScript runtime: {error}"))?;
    let host = Rc::clone(host);
    let script = wrap_code(code);
    let run = context.async_with(async move |ctx| evaluate_code(ctx, &host, script).await);
    let timed_out = format!("the code ran longer than {} seconds", RUN_TIMEOUT.as_secs());
    match tokio::time::timeout(RUN_TIMEOUT, run).await {
        Ok(Err(_interrupted)) if Instant::now() >= deadline => Err(timed_out),
        Ok(result) => result,
        Err(_elapsed) => Err(timed_out),
    }
}
