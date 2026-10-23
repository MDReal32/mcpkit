import { defineTool } from "@usemcpkit/core";

export const groupsWorkspacesGetInternalAgentsAgentwAuthorizeUserAccess = defineTool({
  name: "groups:workspaces:get_internal_agents_agentw_authorize_user_access",
  description: "authorize_user_access. Returns whether the user is authorized to access the workspace.",
  input: {
    type: "object",
    properties: {
      workspace_host: {
        type: "string",
        description: "Host of the workspace being accessed.",
      },
      user_id: {
        type: "integer",
        description: "ID of the user accessing the workspace.",
      },
    },
    required: ["workspace_host", "user_id"],
  },
  request: {
    method: "GET",
    path: "/internal/agents/agentw/authorize_user_access",
    query: ["workspace_host", "user_id"],
  },
});
