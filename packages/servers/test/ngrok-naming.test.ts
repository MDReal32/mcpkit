import { nameUpstreamTool } from "@usemcpkit/core";
import { describe, expect, it } from "vitest";
import { ngrok } from "../src/servers/ngrok/ngrok";

/** The tools in ngrok.com/docs/mcp-server/tools and ngrok.com/docs/mcp-server/ai-gateway (2026-11). */
const UPSTREAM_TOOLS =
  "platform_whoami platform_list_team platform_invite_team_member platform_list_api_keys platform_list_authtokens platform_list_ssh_keys platform_list_access_tokens platform_get_usage platform_get_endpoint_usage platform_get_limits gw_list_endpoints gw_create_cloud_endpoint gw_update_cloud_endpoint gw_validate_traffic_policy gw_list_agents gw_list_kubernetes_operators gw_query_traffic_inspector gw_get_traffic_inspector_request gw_query_connections gw_get_connection gw_get_connection_progress gw_list_app_users gw_list_domains gw_reserve_domain gw_update_domain gw_list_tcp_addresses gw_reserve_tcp_address gw_update_tcp_address gw_list_tls_certificates gw_list_certificate_authorities gw_list_ip_policies gw_list_ip_policy_rules gw_create_ip_policy gw_update_ip_policy gw_create_ip_policy_rule gw_update_ip_policy_rule gw_list_vaults gw_list_secrets gw_create_vault gw_update_vault gw_create_secret gw_update_secret gw_list_event_subscriptions gw_list_event_destinations get_resource delete_resource docs_search docs_get_page docs_get_error aigw_list_access_configs aigw_get_access_config aigw_create_access_config aigw_update_access_config aigw_list_access_keys aigw_get_access_key aigw_create_access_key aigw_update_access_key aigw_list_providers aigw_get_provider aigw_create_provider aigw_update_provider aigw_list_provider_keys aigw_get_provider_key aigw_create_provider_key aigw_rotate_provider_key aigw_update_provider_key aigw_list_virtual_models aigw_get_virtual_model aigw_create_virtual_model aigw_update_virtual_model aigw_list_firewall_policies aigw_get_firewall_policy aigw_create_firewall_policy aigw_update_firewall_policy aigw_get_gateway_config aigw_update_gateway_config aigw_add_credits aigw_list_models aigw_get_model aigw_usage_overview aigw_list_usage aigw_get_request aigw_get_request_attempts aigw_get_capture send_feedback".split(
    " ",
  );
const MAX_NAME_LENGTH = 51;

const naming = ngrok.upstream?.naming;

describe("ngrok naming rules", () => {
  const names = UPSTREAM_TOOLS.map((tool) => nameUpstreamTool(naming, tool));

  it("name every tool of the server as <group>:<resource>:<action>", () => {
    expect(UPSTREAM_TOOLS.filter((_, index) => names[index] === undefined)).toEqual([]);
  });

  it("never give two tools the same name", () => {
    expect(new Set(names).size).toBe(UPSTREAM_TOOLS.length);
  });

  it("keep every MCP tool name within the client's limit", () => {
    const tooLong = names.filter((name) => `cloud_ngrok_${name?.replaceAll(":", "_")}`.length > MAX_NAME_LENGTH);

    expect(tooLong).toEqual([]);
  });

  it("file a few tools where their object says", () => {
    expect(nameUpstreamTool(naming, "gw_list_endpoints")).toBe("gw:endpoints:list");
    expect(nameUpstreamTool(naming, "gw_create_cloud_endpoint")).toBe("gw:endpoints:create");
    expect(nameUpstreamTool(naming, "gw_get_connection_progress")).toBe("gw:connections:get_progress");
    expect(nameUpstreamTool(naming, "gw_list_event_destinations")).toBe("gw:event_destinations:list");
    expect(nameUpstreamTool(naming, "aigw_rotate_provider_key")).toBe("aigw:provider_keys:rotate");
    expect(nameUpstreamTool(naming, "aigw_list_firewall_policies")).toBe("aigw:firewall_policies:list");
    expect(nameUpstreamTool(naming, "something_new")).toBeUndefined();
  });
});
