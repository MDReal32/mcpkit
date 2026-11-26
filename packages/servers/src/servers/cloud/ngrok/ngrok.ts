import { defineServer } from "@usemcpkit/core";
import { NGROK_ACCESS_TOKEN_ENV, NGROK_ACCESS_TOKEN_UI, NGROK_MCP_URL, NGROK_NAMING, NGROK_SCOPES } from "./const";

export const ngrok = defineServer({
  name: "ngrok",
  category: "cloud",
  version: "1.0.0",
  description:
    "ngrok through ngrok's own remote MCP server (ngrok.com/docs/mcp-server, mcp.ngrok.com): the account, team and access tokens, cloud endpoints and their Traffic Policy, agents, Traffic Inspector requests and connections, reserved domains and TCP addresses, TLS certificates, IP policies, vaults and secrets, log exports, AI Gateway (access configs and keys, providers, virtual models, firewall policies, usage) and the ngrok documentation. Tools that create, change or delete act with your role and the scopes you approved.",
  baseUrl: "https://mcp.ngrok.com",
  auth: [
    { type: "oauth", discovery: NGROK_MCP_URL, resource: NGROK_MCP_URL, scopes: NGROK_SCOPES },
    { type: "bearer", env: NGROK_ACCESS_TOKEN_ENV, label: "Access token", ui: NGROK_ACCESS_TOKEN_UI },
  ],
  upstream: { type: "http", url: NGROK_MCP_URL, naming: NGROK_NAMING },
  tools: [],
});
