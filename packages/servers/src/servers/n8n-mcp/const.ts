import type { UpstreamNameRule } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

/** The instance-level MCP server of n8n (Settings → Instance-level MCP); its OAuth sign-in exists from n8n 1.120.0. */
export const N8N_MCP_URL = "https://{domain}/mcp-server/http";

export const N8N_MCP_TOKEN_ENV = "N8N_MCP_TOKEN";

export const N8N_MCP_TOKEN_UI = defineUI({
  inputs: {
    [N8N_MCP_TOKEN_ENV]: {
      label: "MCP access token",
      placeholder: "n8n MCP access token",
      hint: "In n8n, open Settings → Instance-level MCP, select Connect and copy the token from the API key tab; the key from Settings → n8n API does not work here. MCP access must be turned on for the instance. You can also set the N8N_MCP_TOKEN environment variable.",
    },
  },
  actions: [
    {
      type: "link",
      label: "Open the MCP settings ↗",
      url: "https://{domain}/settings/mcp",
    },
    {
      type: "link",
      label: "About this server ↗",
      url: "https://docs.n8n.io/connect/connect-to-n8n-mcp-server",
    },
  ],
});

/**
 * Files the tools of n8n's instance-level MCP server (`TOOLS_BY_SCOPE` in n8n's `packages/cli/src/modules/mcp/mcp-scopes.ts`,
 * 2.47.0) as `<group>:<resource>:<action>`. The names some tools had before n8n renamed them (`get_execution`,
 * `search_executions`, `list_tags`, `prepare_test_pin_data`, `get_sdk_reference`) land on the same names, so an older
 * instance opens by group too. A tool n8n adds later matches none and stays `tools:<snake_case>`.
 */
export const N8N_MCP_NAMING: readonly UpstreamNameRule[] = [
  { match: "^search_workflows$", name: "workflows:workflows:search" },
  { match: "^get_workflow_details$", name: "workflows:workflows:get" },
  { match: "^create_workflow_from_code$", name: "workflows:workflows:create" },
  { match: "^(update|archive|publish|unpublish|execute|test)_workflow$", name: "workflows:workflows:$1" },
  { match: "^move_workflows_to_folder$", name: "workflows:workflows:move" },
  { match: "^get_workflow_history$", name: "workflows:history:list" },
  { match: "^get_workflow_version$", name: "workflows:versions:get" },
  { match: "^get_workflow_versions_diff$", name: "workflows:versions:diff" },
  { match: "^restore_workflow_version$", name: "workflows:versions:restore" },
  { match: "^prepare_(?:workflow|test)_pin_data$", name: "workflows:pin_data:prepare" },
  { match: "^list_(?:workflow_)?tags$", name: "workflows:tags:list" },
  { match: "^get_(?:workflow_)?execution$", name: "executions:executions:get" },
  { match: "^search_(?:workflow_)?executions$", name: "executions:executions:search" },
  { match: "^search_nodes$", name: "builder:nodes:search" },
  { match: "^get_node_types$", name: "builder:node_types:get" },
  { match: "^validate_node_config$", name: "builder:node_configs:validate" },
  { match: "^validate_workflow$", name: "builder:workflows:validate" },
  { match: "^get_workflow_best_practices$", name: "builder:best_practices:get" },
  { match: "^get_(?:workflow_)?sdk_reference$", name: "builder:sdk_reference:get" },
  { match: "^explore_node_resources$", name: "builder:node_resources:explore" },
  { match: "^install_community_node$", name: "builder:community_nodes:install" },
  { match: "^get_instance_context$", name: "instance:context:get" },
  { match: "^(get|expand)_instance_activity$", name: "instance:activity:$1" },
  { match: "^get_node_usage$", name: "instance:node_usage:get" },
  { match: "^search_agents$", name: "agents:agents:search" },
  {
    match: "^(get|validate|create|mutate|revert|delete|publish|unpublish|call)_agent$",
    name: "agents:agents:$1",
  },
  { match: "^list_agent_versions$", name: "agents:versions:list" },
  { match: "^list_agent_sessions$", name: "agents:sessions:list" },
  { match: "^get_agent_session$", name: "agents:sessions:get" },
  { match: "^discover_agent_assets$", name: "agents:assets:discover" },
  { match: "^get_agent_builder_reference$", name: "agents:builder_reference:get" },
  { match: "^verify_agent_mcp_server$", name: "agents:mcp_servers:verify" },
  { match: "^update_agent_integration$", name: "agents:integrations:update" },
  { match: "^search_n8n_skills$", name: "skills:skills:search" },
  { match: "^(get|create|update|delete)_skill$", name: "skills:skills:$1" },
  { match: "^list_credentials$", name: "credentials:credentials:list" },
  { match: "^list_n8n_gateway_services$", name: "credentials:gateways:list" },
  { match: "^update_credential_description$", name: "credentials:descriptions:update" },
  { match: "^search_data_tables$", name: "data_tables:tables:search" },
  { match: "^(create|rename)_data_table$", name: "data_tables:tables:$1" },
  { match: "^get_data_table_rows$", name: "data_tables:rows:list" },
  { match: "^add_data_table_rows$", name: "data_tables:rows:add" },
  { match: "^(add|delete|rename)_data_table_column$", name: "data_tables:columns:$1" },
  { match: "^search_projects$", name: "projects:projects:search" },
  { match: "^search_folders$", name: "projects:folders:search" },
  { match: "^(create|update)_folder$", name: "projects:folders:$1" },
  { match: "^get_user_preferences$", name: "preferences:preferences:get" },
  { match: "^(save|update|undo)_user_preference$", name: "preferences:preferences:$1" },
];
