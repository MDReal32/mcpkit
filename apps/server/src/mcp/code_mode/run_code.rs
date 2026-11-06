use crate::mcp::code_mode::code_mode_host::CodeModeHost;
use crate::mcp::code_mode::code_run::CodeRun;
use crate::mcp::code_mode::run_in_sandbox::run_in_sandbox;
use std::rc::Rc;
use usemcpkit_registry::Fetch;

pub async fn run_code<F: Fetch + 'static>(host: &Rc<CodeModeHost<F>>, code: &str) -> CodeRun {
    let result = run_in_sandbox(host, code).await;
    CodeRun {
        result,
        logs: host.take_logs(),
    }
}
