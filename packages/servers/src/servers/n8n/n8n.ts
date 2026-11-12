import { defineN8nServer } from "../../providers/n8n";
import { n8nTools } from "./tools";

export const n8n = defineN8nServer({
  name: "n8n",
  description:
    "n8n of an n8n Cloud or self-hosted instance, through two APIs that share the instance host. The public REST API (API key): workflows (create, update, publish, activate, archive, transfer, history, tags), executions (list, read, retry, stop), evaluation test runs, credentials and credential type policies, data tables with their columns and rows, projects with their folders, members and variables, users, roles and role mapping rules, instance settings (LDAP, SSO, log streaming, OpenTelemetry, security and node type policies), the security audit, community packages, source control, insights and environment promotions; deprecated operations are not included, which tools work depends on the instance's plan and version and on the API key's scopes, and enterprise features answer 403 without a license. And n8n's own instance-level MCP server (n8n 1.120.0 or later, MCP access turned on under Settings → Instance-level MCP), signed in with one click through n8n's own OAuth: search and run, test, build, update, publish and archive the workflows enabled for MCP, search nodes and validate workflow code, read executions, manage data tables, projects and folders, and on instances that have them agents, skills and credential descriptions; its tools appear once the server was opened with codemode.tools and depend on the instance's version, license and settings and on the permissions granted at sign-in. All tools are named '<group>:<resource>:<action>'; the REST ones sign in with the API key, the MCP ones with their own OAuth or an MCP access token.",
  tools: n8nTools,
});
