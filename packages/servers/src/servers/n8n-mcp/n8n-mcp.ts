import { defineServer } from "@usemcpkit/core";
import { N8N_CATEGORY, N8N_DOMAIN } from "../../providers/n8n";
import { N8N_MCP_NAMING, N8N_MCP_TOKEN_ENV, N8N_MCP_TOKEN_UI, N8N_MCP_URL } from "./const";

export const n8nMcp = defineServer({
  name: "n8n_mcp",
  category: N8N_CATEGORY,
  version: "1.0.0",
  description:
    "The instance-level MCP server of an n8n Cloud or self-hosted instance (n8n 1.120.0 or later, MCP access turned on under Settings → Instance-level MCP), signed in with one click through n8n's own OAuth: search workflows and run, test, build, update, publish and archive the ones enabled for MCP, read their history and executions, search nodes and validate workflow code, manage data tables, projects and folders, and on instances that have them agents, skills and credential descriptions. Which tools appear depends on the instance's version, license and settings and on the permissions granted at sign-in. The REST API (users, roles, instance settings and the rest) is the separate automation:n8n server.",
  baseUrl: "https://{domain}",
  domain: N8N_DOMAIN,
  auth: [
    { type: "oauth", discovery: N8N_MCP_URL },
    { type: "bearer", env: N8N_MCP_TOKEN_ENV, label: "MCP access token", ui: N8N_MCP_TOKEN_UI },
  ],
  upstream: { type: "http", url: N8N_MCP_URL, naming: N8N_MCP_NAMING },
  tools: [],
});
