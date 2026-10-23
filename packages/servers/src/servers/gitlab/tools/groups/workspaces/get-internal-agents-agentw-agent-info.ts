import { defineTool } from "@usemcpkit/core";

export const groupsWorkspacesGetInternalAgentsAgentwAgentInfo = defineTool({
  name: "groups:workspaces:get_internal_agents_agentw_agent_info",
  description: "Gets agentw info. Retrieves agent info for agentw for the given workspace token",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/internal/agents/agentw/agent_info",
  },
});
