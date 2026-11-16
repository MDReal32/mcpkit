use std::time::Duration;

/// The read-only tool: its code finds servers, groups and tools but cannot call them.
pub const SEARCH_TOOL: &str = "search";

/// The tool whose code may also call the tools.
pub const EXECUTE_TOOL: &str = "execute";

/// The one argument of both tools: the JavaScript to run.
pub const CODE_ARGUMENT: &str = "code";

/// How long one run may take, tool calls included; JavaScript still running then is interrupted.
pub const RUN_TIMEOUT: Duration = Duration::from_secs(120);

pub const MEMORY_LIMIT: usize = 64 * 1024 * 1024;

pub const MAX_STACK_SIZE: usize = 1024 * 1024;

/// About 6000 tokens; longer output is cut so one run cannot flood the model's context.
pub const MAX_OUTPUT_CHARS: usize = 24_000;

pub const TRUNCATED_MARKER: &str = "--- TRUNCATED ---";

/// How many group files `codemode.tools` downloads at once for a server split into groups.
pub const PARALLEL_GROUP_LOADS: usize = 8;

/// How many servers `codemode.tools()` with no server loads at once.
pub const PARALLEL_SERVER_LOADS: usize = 4;

pub const GROUP_WITHOUT_SERVER: &str = "codemode.tools needs a server to pick a group from";

/// Called with the host object; defines `codemode` and `console` and keeps the host out of the globals.
pub const PRELUDE: &str = include_str!("prelude.js");

/// The model's function goes where [`CODE_PLACEHOLDER`] is (see `wrap_code`); the promise it evaluates to resolves to the JSON of what the
/// function returned, or to `null` when that has no JSON.
pub const WRAPPER: &str = include_str!("wrapper.js");

pub const CODE_PLACEHOLDER: &str = "__USEMCPKIT_CODE__";

pub const SANDBOX_NOTE: &str = "It runs in a sandbox with no network or file access; what it returns comes back as JSON, \
after anything it wrote with console.log. Return only what is needed: output longer than about 24000 characters is cut.";

pub const SEARCH_API: &str = "In the code:
- codemode.servers(): Promise<{ id: string, description: string, upstream: boolean }[]>
- codemode.groups(server: string): Promise<string[]>, the groups a large server is split into (empty when it is not)
- codemode.tools(server?: string, group?: string): Promise<{ id: string, description: string, inputSchema: object }[]>, \
every tool when called with no server (the tools of an upstream are in it once it was started, and those of a server \
built from its OpenAPI document once they were built for its host, so call codemode.tools(server) for a server whose \
tools are missing), or the tools of one server or one of its groups";

pub const SEARCH_INTRO: &str = "Finds the tools of the servers below by running JavaScript: write an async arrow function, \
such as async () => { ... }.";

pub const SEARCH_EXAMPLE: &str = "Example:
async () => {
  const tools = await codemode.tools();
  return tools.filter((tool) => /branch/.test(tool.id)).map(({ id, description }) => ({ id, description }));
}";

pub const EXECUTE_INTRO: &str = "Calls the tools of the servers by running JavaScript: write an async arrow function, \
such as async () => { ... }. Find a tool's id and input schema with the search tool first.";

pub const EXECUTE_API: &str = "In the code, besides everything the search tool offers:
- codemode.call(id: string, args?: object): Promise<any>, runs a tool and resolves to its result (JSON text comes back \
parsed); a tool that fails throws an Error.
Chain calls, loop and filter in the code, and return only what is needed.";

pub const EXECUTE_EXAMPLE: &str = "Example:
async () => {
  const branches = await codemode.call(\"git:github:repos:repos:list_branches\", { owner: \"octocat\", repo: \"hello-world\" });
  return branches.map((branch) => branch.name);
}";

pub const CODE_ARGUMENT_DESCRIPTION: &str = "An async arrow function, such as async () => { ... }";

pub const SERVERS_HEADING: &str = "Servers:";

pub const FAILED_TOOL_TEXT: &str = "the tool failed without saying why";

pub const NO_RETURN_VALUE: &str = "undefined";

pub const CONSOLE_HEADING: &str = "--- console ---";

pub const RESULT_HEADING: &str = "--- result ---";
