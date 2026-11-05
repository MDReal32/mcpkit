import { DEFAULT_SCHEMA_OPTIONS } from "../../utils/schema/const";
import type { SchemaOptions } from "../../utils/types/schema-options";

/** n8n's repository splits the spec and builds parts of it from code; the published package carries the bundled one. */
export const SPEC_URL = "https://cdn.jsdelivr.net/npm/n8n@2.46.6/dist/public-api/v1/openapi.yml";

export const SCHEMA_OPTIONS: SchemaOptions = DEFAULT_SCHEMA_OPTIONS;

/** The security scheme of an n8n API key, sent in `X-N8N-API-KEY`. */
export const API_KEY_SCHEME = "ApiKeyAuth";

/** Categories are the tags of the spec. */
export const SERVER_GROUPS = [
  {
    name: "workflows",
    categories: ["Workflow", "Executions", "Evaluation", "Tags"],
  },
  {
    name: "credentials",
    categories: ["Credential", "CredentialTypePolicy"],
  },
  {
    name: "data_tables",
    categories: ["DataTable"],
  },
  {
    name: "projects",
    categories: ["Projects", "Folders", "Variables"],
  },
  {
    name: "users",
    categories: ["User", "Role", "RoleMappingRule"],
  },
  {
    name: "settings",
    categories: [
      "SettingsLdap",
      "LogStreaming",
      "SettingsOtel",
      "SecurityPolicy",
      "SettingsSsoOidc",
      "SettingsSsoSaml",
      "NodeTypePolicy",
    ],
  },
  {
    name: "instance",
    categories: ["Audit", "CommunityPackage", "Discover", "Insights", "SourceControl", "N8nPackage", "Promotions"],
  },
];

/** The resource folder of each tag; the tags are PascalCase and some carry their group (`SettingsLdap`). */
export const TAG_RESOURCES: Record<string, string> = {
  Workflow: "workflows",
  Executions: "executions",
  Evaluation: "test-runs",
  Tags: "tags",
  Credential: "credentials",
  CredentialTypePolicy: "type-policies",
  DataTable: "tables",
  Projects: "projects",
  Folders: "folders",
  Variables: "variables",
  User: "users",
  Role: "roles",
  RoleMappingRule: "role-mapping-rules",
  SettingsLdap: "ldap",
  LogStreaming: "log-streaming",
  SettingsOtel: "otel",
  SecurityPolicy: "security-policy",
  SettingsSsoOidc: "oidc",
  SettingsSsoSaml: "saml",
  NodeTypePolicy: "node-type-policies",
  Audit: "audit",
  CommunityPackage: "community-packages",
  Discover: "discover",
  Insights: "insights",
  SourceControl: "source-control",
  N8nPackage: "packages",
  Promotions: "promotions",
};

export const SERVER_NAME = "n8n";

export const SERVER_DESCRIPTION =
  "n8n public REST API of an n8n Cloud or self-hosted instance: workflows (create, update, publish, activate, archive, transfer, history, tags), executions (list, read, retry, stop), evaluation test runs, credentials and credential type policies, data tables with their columns and rows, projects with their folders, members and variables, users, roles and role mapping rules, instance settings (LDAP, SSO, log streaming, OpenTelemetry, security and node type policies), the security audit, community packages, source control, insights and environment promotions. Tools are named '<group>:<resource>:<action>'. Which tools work depends on the instance's plan and version and on the API key's scopes; enterprise features answer 403 without a license. Deprecated operations are not included.";
