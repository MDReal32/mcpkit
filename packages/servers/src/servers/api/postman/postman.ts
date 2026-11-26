import { defineServer } from "@usemcpkit/core";
import { POSTMAN_API_KEY_ENV, POSTMAN_API_KEY_UI, POSTMAN_MCP_URL, POSTMAN_NAMING } from "./const";

export const postman = defineServer({
  name: "postman",
  category: "api",
  version: "1.0.0",
  description:
    "Postman through Postman's own remote MCP server (github.com/postmanlabs/postman-mcp-server, mcp.postman.com) in its Full mode: workspaces, collections with their folders, requests, responses, comments, forks and pull requests, environments, mock servers, monitors, specs, the API catalog, governance rules, SDKs, teams and search. Tools that create, change or delete act with the API key's permissions.",
  baseUrl: "https://mcp.postman.com",
  auth: [
    { type: "oauth", discovery: POSTMAN_MCP_URL },
    { type: "bearer", env: POSTMAN_API_KEY_ENV, label: "API key", ui: POSTMAN_API_KEY_UI },
  ],
  upstream: { type: "http", url: POSTMAN_MCP_URL, naming: POSTMAN_NAMING },
  tools: [],
});
