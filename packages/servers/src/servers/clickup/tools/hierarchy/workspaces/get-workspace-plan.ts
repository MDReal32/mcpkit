import { defineTool } from "@usemcpkit/core";

export const hierarchyWorkspacesGetWorkspacePlan = defineTool({
  name: "hierarchy:workspaces:get_workspace_plan",
  description: "Get Workspace Plan. View the current Plan for the specified Workspace.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "string",
        description: "Workspace ID",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/plan",
  },
});
