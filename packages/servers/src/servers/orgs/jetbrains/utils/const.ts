export const JETBRAINS_CATEGORY = "orgs/jetbrains";

export const JETBRAINS_MCP_PORT_ENV = "IJ_MCP_SERVER_PORT";

export const JETBRAINS_LOOPBACK_HOST = "127.0.0.1";

/**
 * The IDE picks the port of its MCP server when it starts and keeps it nowhere but in its own log, as the line its HTTP
 * server (ktor) writes: "Responding at http://127.0.0.1:64542".
 */
export const JETBRAINS_LOG_PORT_PATTERN = "Responding at http://127\\.0\\.0\\.1:(\\d+)";

export const JETBRAINS_MCP_PATH = "/stream";

export const JETBRAINS_HOST_HINT =
  "The IDE's MCP server, found from the IDE's log (or the IJ_MCP_SERVER_PORT variable) while the IDE runs with Settings → Tools → MCP Server enabled; enter host:port when the IDE is somewhere else.";
