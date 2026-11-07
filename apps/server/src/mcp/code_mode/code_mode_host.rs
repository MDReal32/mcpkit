use crate::catalog::RegistryCatalog;
use crate::mcp::code_mode::consts::{GROUP_WITHOUT_SERVER, MAX_OUTPUT_CHARS};
use crate::mcp::code_mode::load_all_tools::load_all_tools;
use crate::mcp::code_mode::load_group_names::load_group_names;
use crate::mcp::code_mode::load_server_tools::load_server_tools;
use crate::mcp::code_mode::read_outcome_value::read_outcome_value;
use crate::mcp::code_mode::server_tool::ServerTool;
use crate::mcp::tools::run_server_tool;
use serde_json::{Map, Value, json};
use std::cell::{Cell, RefCell};
use std::rc::Rc;
use usemcpkit_execution::CallContext;
use usemcpkit_registry::Fetch;

/// What the sandboxed code reaches through `codemode` and `console`; one host serves one run.
pub struct CodeModeHost<F> {
    catalog: Rc<RegistryCatalog<F>>,
    calls: CallContext,
    allow_calls: bool,
    logs: RefCell<Vec<String>>,
    logged_chars: Cell<usize>,
}

impl<F: Fetch> CodeModeHost<F> {
    /// `allow_calls` is false for the search tool, whose code may only look tools up.
    pub fn new(catalog: Rc<RegistryCatalog<F>>, calls: CallContext, allow_calls: bool) -> Self {
        CodeModeHost {
            catalog,
            calls,
            allow_calls,
            logs: RefCell::new(Vec::new()),
            logged_chars: Cell::new(0),
        }
    }

    pub fn servers(&self) -> Value {
        let servers: Vec<Value> = self
            .catalog
            .servers
            .iter()
            .map(|server| {
                json!({
                    "id": server.id,
                    "description": server.description.clone().unwrap_or_default(),
                    "upstream": server.upstream,
                })
            })
            .collect();
        Value::Array(servers)
    }

    pub async fn groups(&self, server: &str) -> Result<Value, String> {
        let server = self.catalog.find_server(server)?;
        Ok(json!(load_group_names(&self.catalog, server).await?))
    }

    /// The tools of one group or server; with no server, every tool that can be listed without starting an upstream.
    pub async fn tools(&self, server: Option<&str>, group: Option<&str>) -> Result<Value, String> {
        let tools = match (server, group) {
            (Some(server), _) => {
                let server = self.catalog.find_server(server)?;
                load_server_tools(&self.catalog, server, group)
                    .await?
                    .into_iter()
                    .map(|descriptor| ServerTool {
                        server_id: server.id.clone(),
                        descriptor,
                    })
                    .collect()
            }
            (None, Some(_)) => return Err(GROUP_WITHOUT_SERVER.to_owned()),
            (None, None) => load_all_tools(&self.catalog).await?,
        };
        Ok(Value::Array(tools.into_iter().map(ServerTool::into_json).collect()))
    }

    /// `args` is the JSON of the arguments object the code passed.
    pub async fn call(&self, id: &str, args: &str) -> Result<Value, String> {
        if !self.allow_calls {
            return Err("codemode.call is only available in the execute tool".to_owned());
        }
        let args: Map<String, Value> =
            serde_json::from_str(args).map_err(|error| format!("the arguments of {id} must be an object: {error}"))?;
        let outcome = run_server_tool(&self.catalog, id, Some(&args), &self.calls).await?;
        read_outcome_value(outcome)
    }

    /// Keeps a console line until the logs alone fill the output; later lines would be cut anyway.
    pub fn log(&self, line: String) {
        let logged = self.logged_chars.get();
        if logged >= MAX_OUTPUT_CHARS {
            return;
        }
        self.logged_chars.set(logged + line.chars().count());
        self.logs.borrow_mut().push(line);
    }

    pub fn take_logs(&self) -> Vec<String> {
        self.logs.take()
    }
}
