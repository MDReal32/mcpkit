import { defineTool } from "@usemcpkit/core";

export const hierarchyWorkspacesGetWorkspaceSeats = defineTool({
  name: "hierarchy:workspaces:get_workspace_seats",
  description: "Get Workspace seats. View the used, total, and available member and guest seats for a Workspace.",
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
    path: "/v2/team/{team_id}/seats",
  },
});
