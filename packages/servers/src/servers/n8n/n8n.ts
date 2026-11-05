import { defineN8nServer } from "../../providers/n8n";
import { n8nTools } from "./tools";

export const n8n = defineN8nServer({
  name: "n8n",
  description:
    "n8n public REST API of an n8n Cloud or self-hosted instance: workflows (create, update, publish, activate, archive, transfer, history, tags), executions (list, read, retry, stop), evaluation test runs, credentials and credential type policies, data tables with their columns and rows, projects with their folders, members and variables, users, roles and role mapping rules, instance settings (LDAP, SSO, log streaming, OpenTelemetry, security and node type policies), the security audit, community packages, source control, insights and environment promotions. Tools are named '<group>:<resource>:<action>'. Which tools work depends on the instance's plan and version and on the API key's scopes; enterprise features answer 403 without a license. Deprecated operations are not included.",
  tools: n8nTools,
});
