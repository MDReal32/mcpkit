# @usemcpkit/upstream

A minimal MCP client for the servers an mcpkit manifest fronts (`manifest.upstream`). Private; bundled into the CLI.

`connectUpstream(spec, options)` starts the transport (`transport/stdio-transport.ts` spawns the command without a
shell; `transport/http-transport.ts` speaks Streamable HTTP, JSON or SSE replies), runs the `initialize` handshake and
returns a connection with `listTools` (follows pagination), `callTool` and `close`. Only the request/response half of
MCP is implemented; server-initiated requests are ignored.
