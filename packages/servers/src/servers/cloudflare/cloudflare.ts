import { defineServer } from "@usemcpkit/core";
import { CLOUDFLARE_MCP_URL, CLOUDFLARE_NAMING, CLOUDFLARE_TOKEN_ENV, CLOUDFLARE_TOKEN_UI } from "./const";

export const cloudflare = defineServer({
  name: "cloudflare",
  category: "cloud",
  version: "1.0.0",
  description:
    "The Cloudflare API through Cloudflare's own remote MCP server (github.com/cloudflare/mcp, mcp.cloudflare.com), in code mode: search the OpenAPI spec and run API calls from JavaScript, so every product (Workers, KV, R2, D1, Pages, DNS, firewall, load balancers, Access and more) is reachable through a few tools, plus Cloudflare documentation search and whoami. `execute` can change or delete anything the token allows, so give the token only the permissions you want the AI to have.",
  baseUrl: "https://mcp.cloudflare.com",
  auth: [{ type: "bearer", env: CLOUDFLARE_TOKEN_ENV, label: "API token", ui: CLOUDFLARE_TOKEN_UI }],
  upstream: { type: "http", url: CLOUDFLARE_MCP_URL, naming: CLOUDFLARE_NAMING },
  tools: [],
});
