import { nameUpstreamTool } from "@usemcpkit/core";
import { describe, expect, it } from "vitest";
import { n8n } from "../src/servers/n8n/n8n";

/** Every tool of n8n's instance-level MCP server: `TOOLS_BY_SCOPE` in `packages/cli/src/modules/mcp/mcp-scopes.ts`, 2.47.0. */
const UPSTREAM_TOOLS =
  "search_workflows get_workflow_details get_workflow_history get_workflow_version get_workflow_versions_diff search_nodes get_node_types get_workflow_best_practices get_workflow_sdk_reference validate_workflow validate_node_config get_instance_context get_instance_activity expand_instance_activity get_node_usage create_workflow_from_code update_workflow archive_workflow restore_workflow_version publish_workflow unpublish_workflow move_workflows_to_folder execute_workflow test_workflow prepare_workflow_pin_data get_workflow_execution search_workflow_executions search_agents get_agent list_agent_versions list_agent_sessions get_agent_session discover_agent_assets validate_agent get_agent_builder_reference create_agent mutate_agent revert_agent delete_agent verify_agent_mcp_server update_agent_integration publish_agent unpublish_agent call_agent search_n8n_skills get_skill create_skill update_skill delete_skill list_credentials list_n8n_gateway_services explore_node_resources update_credential_description search_data_tables get_data_table_rows create_data_table rename_data_table add_data_table_column delete_data_table_column rename_data_table_column add_data_table_rows search_projects search_folders create_folder update_folder list_workflow_tags install_community_node get_user_preferences save_user_preference update_user_preference undo_user_preference".split(
    " ",
  );

/** The names of tools n8n renamed later, as 2.30.0 and older serve them, with the tool that replaced each. */
const RENAMED_TOOLS = {
  get_execution: "get_workflow_execution",
  search_executions: "search_workflow_executions",
  list_tags: "list_workflow_tags",
  prepare_test_pin_data: "prepare_workflow_pin_data",
  get_sdk_reference: "get_workflow_sdk_reference",
};

const MAX_NAME_LENGTH = 51;

const naming = n8n.upstream?.type === "http" ? n8n.upstream.naming : undefined;

describe("n8n MCP naming rules", () => {
  const names = UPSTREAM_TOOLS.map((tool) => nameUpstreamTool(naming, tool));

  it("name every tool of the server as <group>:<resource>:<action>", () => {
    expect(UPSTREAM_TOOLS.filter((_, index) => names[index] === undefined)).toEqual([]);
  });

  it("never give two tools the same name", () => {
    expect(new Set(names).size).toBe(UPSTREAM_TOOLS.length);
  });

  it("keep every MCP tool name within the client's limit", () => {
    const tooLong = names.filter((name) => `automation_n8n_${name?.replaceAll(":", "_")}`.length > MAX_NAME_LENGTH);

    expect(tooLong).toEqual([]);
  });

  it("give a tool's older name the name of the tool that replaced it", () => {
    for (const [older, current] of Object.entries(RENAMED_TOOLS)) {
      expect(nameUpstreamTool(naming, older)).toBe(nameUpstreamTool(naming, current));
    }
  });

  it("file a few tools where their object says", () => {
    expect(nameUpstreamTool(naming, "search_workflows")).toBe("workflows:workflows:search");
    expect(nameUpstreamTool(naming, "execute_workflow")).toBe("workflows:workflows:execute");
    expect(nameUpstreamTool(naming, "search_workflow_executions")).toBe("executions:executions:search");
    expect(nameUpstreamTool(naming, "rename_data_table_column")).toBe("data_tables:columns:rename");
    expect(nameUpstreamTool(naming, "something_new")).toBeUndefined();
  });
});
