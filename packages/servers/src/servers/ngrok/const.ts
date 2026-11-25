import type { UpstreamNameRule } from "@usemcpkit/core";
import { defineUI } from "@usemcpkit/core";

export const NGROK_MCP_URL = "https://mcp.ngrok.com/mcp";

export const NGROK_ACCESS_TOKEN_ENV = "NGROK_ACCESS_TOKEN";

export const NGROK_ACCESS_TOKEN_UI = defineUI({
  inputs: {
    [NGROK_ACCESS_TOKEN_ENV]: {
      label: "Access token",
      placeholder: "ngrok_pat_…",
      hint: "An ngrok access token with the scopes you want the AI to have (API keys and authtokens do not work); or set the NGROK_ACCESS_TOKEN environment variable.",
    },
  },
  actions: [
    {
      type: "link",
      label: "Create an access token ↗",
      url: "https://dashboard.ngrok.com/access-tokens",
    },
    {
      type: "link",
      label: "About this server ↗",
      url: "https://ngrok.com/docs/mcp-server",
    },
  ],
});

/**
 * ngrok names its tools `<area>_<verb>_<object>` (`gw_list_endpoints`), so each rule files them under the area as the
 * group and spells out the object and the verb. A tool ngrok adds later matches none and stays `tools:<snake_case>`,
 * which makes the server open as one flat list until a rule names it.
 */
export const NGROK_NAMING: readonly UpstreamNameRule[] = [
  { match: "^platform_whoami$", name: "platform:account:whoami" },
  { match: "^platform_list_team$", name: "platform:team:list" },
  { match: "^platform_invite_team_member$", name: "platform:team:invite" },
  { match: "^platform_list_(api_keys|authtokens|ssh_keys|access_tokens)$", name: "platform:$1:list" },
  { match: "^platform_get_(usage|limits)$", name: "platform:$1:get" },
  { match: "^platform_get_endpoint_usage$", name: "platform:endpoint_usage:get" },

  { match: "^gw_list_endpoints$", name: "gw:endpoints:list" },
  { match: "^gw_(create|update)_cloud_endpoint$", name: "gw:endpoints:$1" },
  { match: "^gw_validate_traffic_policy$", name: "gw:traffic_policies:validate" },
  {
    match:
      "^gw_list_(agents|kubernetes_operators|app_users|domains|tcp_addresses|tls_certificates|certificate_authorities)$",
    name: "gw:$1:list",
  },
  { match: "^gw_list_ip_policies$", name: "gw:ip_policies:list" },
  { match: "^gw_list_ip_policy_rules$", name: "gw:ip_policy_rules:list" },
  { match: "^gw_(create|update)_ip_policy$", name: "gw:ip_policies:$1" },
  { match: "^gw_(create|update)_ip_policy_rule$", name: "gw:ip_policy_rules:$1" },
  { match: "^gw_list_(vaults|secrets)$", name: "gw:$1:list" },
  { match: "^gw_(create|update)_vault$", name: "gw:vaults:$1" },
  { match: "^gw_(create|update)_secret$", name: "gw:secrets:$1" },
  { match: "^gw_(reserve|update)_domain$", name: "gw:domains:$1" },
  { match: "^gw_(reserve|update)_tcp_address$", name: "gw:tcp_addresses:$1" },
  { match: "^gw_query_traffic_inspector$", name: "gw:traffic_inspector:query" },
  { match: "^gw_get_traffic_inspector_request$", name: "gw:traffic_inspector:get_request" },
  { match: "^gw_query_connections$", name: "gw:connections:query" },
  { match: "^gw_get_connection$", name: "gw:connections:get" },
  { match: "^gw_get_connection_progress$", name: "gw:connections:get_progress" },
  { match: "^gw_list_event_(subscriptions|destinations)$", name: "gw:event_$1:list" },

  { match: "^(get|delete)_resource$", name: "resources:resources:$1" },
  { match: "^docs_search$", name: "docs:pages:search" },
  { match: "^docs_get_page$", name: "docs:pages:get" },
  { match: "^docs_get_error$", name: "docs:errors:get" },
  { match: "^send_feedback$", name: "feedback:feedback:send" },

  { match: "^aigw_(list|get|create|update)_access_configs?$", name: "aigw:access_configs:$1" },
  { match: "^aigw_(list|get|create|update)_access_keys?$", name: "aigw:access_keys:$1" },
  { match: "^aigw_(list|get|create|update)_providers?$", name: "aigw:providers:$1" },
  { match: "^aigw_(list|get|create|rotate|update)_provider_keys?$", name: "aigw:provider_keys:$1" },
  { match: "^aigw_(list|get|create|update)_virtual_models?$", name: "aigw:virtual_models:$1" },
  { match: "^aigw_list_firewall_policies$", name: "aigw:firewall_policies:list" },
  { match: "^aigw_(get|create|update)_firewall_policy$", name: "aigw:firewall_policies:$1" },
  { match: "^aigw_(get|update)_gateway_config$", name: "aigw:gateway_config:$1" },
  { match: "^aigw_add_credits$", name: "aigw:credits:add" },
  { match: "^aigw_(list|get)_models?$", name: "aigw:models:$1" },
  { match: "^aigw_usage_overview$", name: "aigw:usage:overview" },
  { match: "^aigw_list_usage$", name: "aigw:usage:list" },
  { match: "^aigw_get_request$", name: "aigw:requests:get" },
  { match: "^aigw_get_request_attempts$", name: "aigw:requests:get_attempts" },
  { match: "^aigw_get_capture$", name: "aigw:captures:get" },
];
